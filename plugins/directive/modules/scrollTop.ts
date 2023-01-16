/**
 * v-scrollTop
 * client: true
 * server: false
 * 例子
 * <ClientOnly>
    <button v-scrollTop:content="100">滚动到顶部</button>
        <div id="content" v-scrollBottom class="w-[200px] h-[200px] overflow-y-auto">
            <div v-for="index in num" :key="index">第{{index}}个</div>
        </div>
 * </ClientOnly>
 * 滚动到顶部
 */
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
    __handleClick__: () => any;
    __handleScroll__: () => any;
}
const scrollTop: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        const target: ElType | any = binding.arg ? document.getElementById(binding.arg) : window;
        el.__handleClick__ = function () {
            target?.scrollTo({
                top: 0,
                // 过度动画
                behavior: "smooth"
            })
        }
        target.__handleScroll__ = function (e: any) {
            if (e.srcElement.scrollTop > binding.value) {
              el.style.visibility = "unset";
            } else {
              el.style.visibility = "hidden";
            }
        }
        el.addEventListener("click", el.__handleClick__);
        target?.addEventListener("scroll", target.__handleScroll__);
    },
    beforeUnmount(el: ElType, binding: DirectiveBinding) {
        const target: ElType | any = binding.arg ? document.getElementById(binding.arg) : window;
        el.removeEventListener("click", el.__handleClick__);
        target?.removeEventListener("scroll", target.__handleScroll__);
    }
};

export default scrollTop;