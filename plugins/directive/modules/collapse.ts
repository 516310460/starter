/**
 * v-collapse
 * client: true
 * server: false
 * 例子
 * <ClientOnly>
    <div
        v-collapse="{open:'200px',close:'43px',icon:'iconfont icon_global_ArrowDown'}"
        style="width:200px;margin:0 auto"
    >
        <div class="box"></div>
    </div>
 * </ClientOnly>
 * 支持传入指定的绑定值，参数 open 展开时的高度 close 收起时的高度 icon 展开收起图标，必传
 */
import type { Directive, DirectiveBinding } from "vue";
const collapse: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { value } = binding
        el.style.height = value.open
        el.style.position = 'relative'
        el.style.transition = 'all .4s'
        let collapse = true
        const collapseBtn = document.createElement('i')
        const style = value.style || {
            position: 'absolute',
            right: '15px',
            top: '12px',
            zIndex: '9999',
            transform: 'rotate(0deg)',
            color: '#333',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all .4s',
        }
        Object.keys(style).forEach((key: any) => {
            collapseBtn.style[key] = style[key]
        })
        collapseBtn.className = value.icon || ''
        el.appendChild(collapseBtn)
        collapseBtn.addEventListener('click', (e: any) => {
            if (collapse) {
                e.target.style.transform = 'rotate(180deg)'
                el.style.height = value.close
            } else {
                e.target.style.transform = 'rotate(0deg)'
                el.style.height = value.open
            }
            collapse = !collapse
        })
    }
};

export default collapse;