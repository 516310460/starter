/**
 * v-debounce
 * client: true
 * server: false
 * 例子
 * <ClientOnly>
 *      <button v-debounce="="refresh">复制</button>
        <input v-debounce="inputValueFn" v-model="inputValue" placeholder="防抖--输入框" />
 * </ClientOnly>
 * 按钮防抖指令
 * 接收参数：function类型
 */
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
    __handleClick__: () => any;
    __handleInput__: () => any;
}
const debounce: Directive = {
    mounted(el: ElType | any, binding: DirectiveBinding) {
        if (typeof binding.value !== "function") {
            throw "callback must be a function";
        }
        let timer: NodeJS.Timeout | null = null;
        const delay = 300
        if (el.tagName === 'INPUT') {
            el.__handleInput__ = function () {
                if (timer) { 
                    clearTimeout(timer) 
                }
                timer = setTimeout(() => {
                    binding.value();
                }, delay)
            }
            el.addEventListener("input", el.__handleInput__);
        } else {
            el.__handleClick__ = function () {
                if (timer) {
                    clearInterval(timer);
                }
                timer = setTimeout(() => {
                    binding.value();
                }, delay);
            };
            el.addEventListener("click", el.__handleClick__);
        }
    },
    beforeUnmount(el: ElType) {
        if (el.tagName === 'INPUT') {
            el.removeEventListener("input", el.__handleInput__);
        } else {
            el.removeEventListener("click", el.__handleClick__);
        }
    }
};

export default debounce;