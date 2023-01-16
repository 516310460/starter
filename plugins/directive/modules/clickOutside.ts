/**
 * v-clickOutside
 * client: true
 * server: false
 * 例子
 * <ClientOnly>
 * 100到多少才显示
    <button v-clickOutside>点击隐藏</button>
 * </ClientOnly>
 * 点击外部区域，关闭当前组件
 */
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
    __handleClick__: (e: any) => any;
}
const clickOutside: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        el.__handleClick__ = function (e: any) {
            e = e || window.event
            e.stopPropagation()
        }
        el.addEventListener("click", el.__handleClick__);
        document.addEventListener('click', ()=>{
            el.style.display = 'none'
        })
    },
    beforeUnmount(el: ElType, binding: DirectiveBinding) {
        el.removeEventListener("click", el.__handleClick__);
        document.removeEventListener('click', ()=>{})
    }
};

export default clickOutside;