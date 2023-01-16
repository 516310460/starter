/**
 * v-hide-text
 * client: true
 * server: false
 * 例子
 * <ClientOnly>
    <div v-hide-text.name>张三</div>
    <!-- 张* -->
    <div v-hide-text.name>张三丰</div>
    <!-- 张*丰 -->
    <div v-hide-text.mobile>13412345678</div>
    <!-- 134****5678 -->
    <div v-hide-text.idcard>422124199010101234</div>
    <!-- 422124********1234 -->
 * </ClientOnly>
 * 隐藏关键信息
 */
import type { Directive, DirectiveBinding } from "vue";
const hideText: Directive = {
    beforeMount(el: HTMLElement, {
        modifiers
    }) {
        //设置默认值为name
        Object.keys(modifiers).length === 0 && (modifiers.name = true);
        if (modifiers.mobile) {
            // 手机号码
            el.innerText = el.innerText.replace(/^(\d{3})\d+(\d{4})$/, '$1****$2');
        } else if (modifiers.name) {
            // 姓名 两个字隐藏后一个，两个字以上隐藏中间
            el.innerText = el.innerText.length > 2 ? el.innerText.replace(/^(\S{1})\S+(\S{1})/, '$1*$2') : el.innerText.substring(0, 1) + '*';
        } else if (modifiers.idcard) {
            //身份证
            el.innerText = el.innerText.replace(/^(\d{6})\d+(\d{4})$/, '$1********$2');
        }
    }
};

export default hideText;