/**
 * v-loading
 * client: true
 * server: false
 * 例子
 * <ClientOnly>
        <div
            v-loading="loading"
            :style="{
            width: '100px',
            height: '100px',
            backgroundImage: 'url('https://avatars.githubusercontent.com/u/65016011?v=4')',
            backgroundSize: 'cover'
            }"
        ></div>
        <button @click="changeLoading">switch</button>
 * </ClientOnly>
 * 加载动画
 */
import { Directive, DirectiveBinding } from 'vue'

const elMapToMaskElement: WeakMap<Element, HTMLDivElement> = new WeakMap()

const elMapToHasChangedPosition: WeakMap<Element, boolean> = new WeakMap()

export function isFunction(x: any): boolean {
    return typeof x === 'function'
}

export function isBoolean(x: any): boolean {
    return typeof x === 'boolean'
}

export const loadingSvgNode = `
  <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
      <defs>
          <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
              <stop stop-color="#fff" stop-opacity="0" offset="0%"/>
              <stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/>
              <stop stop-color="#fff" offset="100%"/>
          </linearGradient>
      </defs>
      <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)">
              <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                  <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="0.9s"
                      repeatCount="indefinite" />
              </path>
              <circle fill="#fff" cx="36" cy="18" r="1">
                  <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="0.9s"
                      repeatCount="indefinite" />
              </circle>
          </g>
      </g>
  </svg>
  `

const appendChild = (el: HTMLElement): void => {
    const loadingWrapper = document.createElement('div')
    const maskElement = document.createElement('div')
    maskElement.style.position = 'absolute'
    maskElement.style.top = '0'
    maskElement.style.left = '0'
    maskElement.style.right = '0'
    maskElement.style.bottom = '0'
    maskElement.style.zIndex = '9999'
    maskElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    maskElement.style.pointerEvents = 'none'

    loadingWrapper.style.position = 'absolute'
    loadingWrapper.style.top = '50%'
    loadingWrapper.style.left = '50%'
    loadingWrapper.style.transform = 'translate(-50%, -50%)'
    loadingWrapper.style.pointerEvents = 'none'
    loadingWrapper.innerHTML = loadingSvgNode
    if (el.style.position === 'static' || el.style.position === '') {
        elMapToHasChangedPosition.set(el, true)
        el.style.position = 'relative'
    }
    maskElement.appendChild(loadingWrapper)
    elMapToMaskElement.set(el, maskElement)
    el.appendChild(maskElement)
}

const loading: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { value } = binding
        if (!isBoolean(value)) return
        if (!value) return
        console.log(process.client)
        appendChild(el)
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
        const { value } = binding
        const hasMaskElement = elMapToMaskElement.has(el)
        const hasChangedPosition = elMapToHasChangedPosition.has(el)
        if (value && hasMaskElement) return
        if (value && !hasMaskElement) {
            appendChild(el)
        }
        if ((!value || !isBoolean(value)) && !hasMaskElement) return
        if ((!value || !isBoolean(value)) && hasMaskElement) {
            if (hasChangedPosition) {
                el.style.position = 'static'
                elMapToHasChangedPosition.delete(el)
            }
            const maskElement = elMapToMaskElement.get(el)
            maskElement && el.removeChild(maskElement)
            elMapToMaskElement.delete(el)
        }
    },
    beforeUnmount(el: HTMLElement) {
        elMapToMaskElement.delete(el)
        elMapToHasChangedPosition.delete(el)
    }
}
export default loading