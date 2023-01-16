/**
 * v-scrollBottom
 * client: true
 * server: false
 * 例子
 * <ClientOnly>
    <div v-scrollBottom class="w-[200px] h-[200px] overflow-y-auto">
        <div v-for="index in 100" :key="index">第{{index}}个</div>
    </div>
 * </ClientOnly>
 * 滚动到底部
 */
import type { Directive, DirectiveBinding } from "vue";
const scrollBottom: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        el.scrollTo({
            top: el.scrollHeight - el.clientHeight,
            // 过度动画
            // behavior: "smooth"
        })
    },
    updated(el: HTMLElement) {
        el.scrollTo({
            top: el.scrollHeight - el.clientHeight,
            // 过度动画
            behavior: "smooth"
        })
    }
};

export default scrollBottom;