/**
 * v-input
 * client: true
 * server: false
 * 例子
 * 使用：type 值： 'number'：数字类型, 'decimal'：数字加小数, 'decimal_2'：数字加 2 位小数, 'customize'：自定义正则，允许你通过 data-rule= 传递一个自定义的正则表达式
 * <ClientOnly>
 * 100到多少才显示
    <input
        v-input:customize="inputValue"
        data-rule="/[^\d]/"
        v-model="inputValue"
    />
 * </ClientOnly>
 * input格式化value处理
 */
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
    $handler: (el: any) => void;
    __handleClick__: (e: any) => any;
}
// 派发自定义事件
const trigger = (el: { value?: string; dataset?: { rule: string; }; dispatchEvent?: any; }, type: string) => {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
}
const input: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        const _type = binding.arg;
        const types = ['number', 'decimal', 'decimal_2', 'customize'];
        if (!_type || !types.includes(_type)) return console.log(`使用v-input指令需要选择特定功能：v-input:type="inputValue";  type = ${types.join('/')}.`);
        el.$handler = (el: any) => {
            switch (_type) {
                // 数字
                case 'number':
                    el.value = el.value.replace(/[^\d]/, '');
                    break;
                // 数字+小数
                case 'decimal':
                    el.value = el.value.replace(/[^\d.]/g, ''); // 清除数字和'.'以外的字符  
                    el.value = el.value.replace(/\.{2,}/g, '.'); // 连续两个'.', 只保留第一个'.'
                    el.value = el.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.'); // 隔着字符, 也保证只有一个'.'
                    el.value.indexOf('.') < 0 && el.value != '' && (el.value = parseFloat(el.value).toString()); // 保证不会出现重复的: 00, 01, 02 ...
                    el.value.indexOf('.') > -1 && el.value.length === 1 && (el.value = ''); // 第一位不能以'.'开头
                    break;
                // 数字+两位小数
                case 'decimal_2':
                    el.value = el.value.replace(/[^\d.]/g, '');
                    el.value = el.value.replace(/\.{2,}/g, '.');
                    el.value = el.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
                    el.value = el.value.replace(/^(\-)*(\d+)\.(\d{2}).*$/, '$1$2.$3'); // 只能输入两位小数  \d{n} n代表多少位
                    el.value.indexOf('.') < 0 && el.value != '' && (el.value = parseFloat(el.value).toString());
                    el.value.indexOf('.') > -1 && el.value.length === 1 && (el.value = '');
                    break;
                // 自定义, 由data-rule提供规则
                case 'customize':
                    const rule = el.dataset.rule && eval(el.dataset.rule); // 字符串正则转正则表达式
                    el.value = el.value.replace(rule, '');
                    break;
            }
            trigger(el, 'input');
        }
        el.$handler(el);
    },
    updated(el) {
        el.$handler && el.$handler(el)
    }
};

export default input;