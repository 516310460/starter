/**
 * v-throttle
 * client: true
 * server: false
 * 例子
 * <ClientOnly>
 *      <button v-throttle="="refresh">复制</button>
        <input v-throttle="inputValueFn" v-model="inputValue" placeholder="节流--输入框" />
 * </ClientOnly>
 * 节流指令
 * 接收参数：function类型
 */
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
    __handleClick__: () => any;
    __handleInput__: () => any;
    disabled: boolean;
}
const throttle: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        if (typeof binding.value !== "function") {
            throw "callback must be a function";
        }
        let timer: NodeJS.Timeout | null = null;
        const delay = 300
        if (el.tagName === 'INPUT') {
            el.__handleInput__ = function () {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    binding.value();
                }, delay)
            }
            el.addEventListener("input", el.__handleInput__);
        } else {
            el.__handleClick__ = function () {
                if (timer) {
                    clearTimeout(timer);
                }
                if (!el.disabled) {
                    el.disabled = true;
                    binding.value();
                    timer = setTimeout(() => {
                        el.disabled = false;
                    }, delay);
                }
            };
            el.addEventListener("click", el.__handleClick__);
        }
        el.addEventListener("click", el.__handleClick__);
    },
    beforeUnmount(el: ElType) {
        if (el.tagName === 'INPUT') {
            el.removeEventListener("input", el.__handleInput__);
        } else {
            el.removeEventListener("click", el.__handleClick__);
        }
    }
};

export default throttle;