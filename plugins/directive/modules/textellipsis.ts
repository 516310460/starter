/**
 * v-textellipsis
 * client: true
 * server: false
 * 例子
 * <ClientOnly>
    <div v-textellipsis:3 class="w-[300px]">2016-5-26 · CSS 如何实现文字溢出<strong>隐藏</strong>时，<strong>隐藏</strong>左边或者右边，并显示省略号 指定一个定宽高的盒子，当文字溢出，会换行显示出来。 .box { width: 60px; height: 30px; background-color: #ff0000 2 0; } 当限制 文字 不换 行 后 ，会在一 行 超出 显示 出来。</div>
 * </ClientOnly>
 * 超过多少行隐藏
 */

import { Directive, DirectiveBinding } from 'vue'

const handler = (el: HTMLElement, binding: DirectiveBinding) => {
  el.style.overflow = 'hidden'
  el.style.textOverflow = 'ellipsis'
  const { arg } = binding
  if (arg) {
    el.style.display = '-webkit-box'
    el.style.webkitLineClamp = String(Number(arg))
    el.style.webkitBoxOrient = 'vertical'
  } else {
    el.style.whiteSpace = 'nowrap'
  }
}

const textellipsis: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    handler(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    handler(el, binding)
  }
}
export default textellipsis