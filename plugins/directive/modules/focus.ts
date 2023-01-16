/**
 * v-focus
 * client: true
 * server: false
 * 例子
 * <ClientOnly>
 *      <input v-focus v-model="inputValue"/>
 * </ClientOnly>
 * input获取焦点
 */
import type { Directive, DirectiveBinding } from "vue";
const focus: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        // 聚焦元素
        el.focus()
    }
};

export default focus;