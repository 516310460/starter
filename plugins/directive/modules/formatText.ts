/**
 * v-format-text
 * client: true
 * server: false
 * 例子
 * <ClientOnly>
    <div v-format-text.money="','">123456789</div>
    <!-- 123,456,789 -->
    <div v-format-text.money="'_'">123456789</div>
    <!-- 123_456_789 -->
    <div v-format-text.money:4="','">123456789</div>
    <!-- 1234,4567,89 -->
    <div v-format-text.money:4="','">123456789</div>
    <!-- 1234,4567,89 -->
    <div v-format-text>abcdefghi</div>
    <!-- abc,def,ghi- -->
 * </ClientOnly>
 * 格式化，暂时不支持位数格式化，后期需要再修改
 */
import type { Directive, DirectiveBinding } from "vue";
const formatText: Directive = {
    beforeMount(el: HTMLElement, binding: DirectiveBinding) {
        let { value = ',', arg = 3, modifiers } = binding;
        if (modifiers.money) {
            // 金额
            el.innerText = el.innerText.replace(/^-?\d+/g, (m: string) => m.replace(/(?=(?!\b)(\d{3})+$)/g, value));
        } else {
            // 普通字符串
            let regText = '\\B(?=(\\w{' + arg + '})+(?!\\w))';
            let reg = new RegExp(regText, 'g');
            el.innerText = el.innerText.replace(reg, value);
        }
    }
};

export default formatText;