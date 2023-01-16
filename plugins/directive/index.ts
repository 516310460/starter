import { defineNuxtPlugin } from '#app'
import copy from './modules/copy';
import waterMarker from "./modules/waterMarker";
import draggable from "./modules/draggable";
import debounce from "./modules/debounce";
import throttle from "./modules/throttle";
import longpress from "./modules/longpress";
import focus from "./modules/focus";
import scrollBottom from "./modules/scrollBottom";
import scrollTop from "./modules/scrollTop";
import clickOutside from "./modules/clickOutside";
import input from "./modules/input";
import formatText from "./modules/formatText";
import hideText from "./modules/hideText";
import LazyLoad from "./modules/LazyLoad";
import collapse from "./modules/collapse";
import textellipsis from "./modules/textellipsis";
import loading from "./modules/loading";

export default defineNuxtPlugin( nuxtApp => {
    const directivesList: any = {
        copy,
        waterMarker,
        draggable,
        debounce,
        throttle,
        longpress,
        focus,
        scrollBottom,
        scrollTop,
        clickOutside,
        input,
        formatText,
        hideText,
        LazyLoad,
        collapse,
        textellipsis,
        loading
    };
    Object.keys(directivesList).forEach(key => {
        // 注册自定义指令
        nuxtApp.vueApp.directive(key, directivesList[key]);
    });
    // /***
    //  * 防抖 单位时间只触发最后一次
    //  *  @param {?Number|300} time - 间隔时间
    //  *  @param {Function} fn - 执行事件
    //  *  @param {?String|"click"} event - 事件类型 例："click"
    //  *  @param {Array} binding.value - [fn,event,time]
    //  *  例：<el-button v-debounce="[reset,`click`,300]">刷新</el-button>
    //  *  也可简写成：<el-button v-debounce="[reset]">刷新</el-button>
    //  */
    // nuxtApp.vueApp.directive('debounce', {
    //     // // 指令首次绑定到元素且在安装父组件之前...「等同于bind」
    //     // beforeMount(el, binding, vnode, prevVnode) {
    //     //     // binding:数据对象
    //     //     //   + arg:传给指令的参数   v-xxx:n -> arg:"n"
    //     //     //   + modifiers:修饰符对象 v-xxx.stop -> modifiers:{stop:true}
    //     //     //   + value:指令绑定的值   v-xxx="1+1" -> value:2
    //     //     //   + oldValue:之前绑定的值
    //     // },
    //     // // 安装绑定元素的父组件时...「等同于inserted」
    //     // mounted() {},
    //     // // 在包含组件的VNode更新之前...
    //     // beforeUpdate() {},
    //     // // 在包含组件的VNode及其子VNode更新后...「等同于componentUpdated」
    //     // updated() {},
    //     // // 在卸载绑定元素的父组件之前...
    //     // beforeUnmount() {},
    //     // // 指令与元素解除绑定且父组件已卸载时...「等同于unbind」
    //     // unmounted() {}
    //     mounted(el: HTMLElement, binding) {
    //         // console.log(binding.value)
    //         let [fn, event = "click", time = 300] = binding.value
    //         let timer: NodeJS.Timeout
    //         el.addEventListener(event, () => {
    //             timer && clearTimeout(timer)
    //             timer = setTimeout(() => fn(), time)
    //         })
    //     }
    // })

    // /***
    //  * 节流 每隔间歌一段时间只触发最后一次
    //  *  第一次瞬间触发，最后一次不管是否达到间隔时间依然触发
    //  * 【考虑到input的change事件】
    //  *  @param {?Number|300} time - 间隔时间
    //  *  @param {Function} fn - 执行事件
    //  *  @param {?String|"click"} event - 事件类型 例："click"
    //  *  @param {Array} binding.value - [fn,event,time]
    //  *  例：<el-button v-throttle="[reset,`click`,300]">刷新</el-button>
    //  *  传递参数则：<el-button v-throttle="[()=>reset(param),`click`,300]">刷新</el-button>
    //  */
    // nuxtApp.vueApp.directive('throttle', {
    //     mounted(el: HTMLElement, binding) {
    //         let [fn, event = "click", time = 300] = binding.value
    //         let timer: NodeJS.Timeout | null, timer_end: NodeJS.Timeout;
    //         el.addEventListener(event, () => {
    //             if (timer) {
    //                 clearTimeout(timer_end);
    //                 return timer_end = setTimeout(() => fn(), time);
    //             }
    //             fn();
    //             timer = setTimeout(() => timer = null, time)
    //         })
    //     }
    // })

    // /***
    //  * input 获取焦点
    //  */
    // nuxtApp.vueApp.directive('focus', {
    //     mounted(el: HTMLElement) {
    //         el.focus()
    //     }
    // })
})