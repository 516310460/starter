// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import type { AxiosResponse } from 'axios';
import type { RequestOptions, Result } from './types';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';

import { VAxios } from './Axios';
import { checkStatus } from './checkStatus';

import { RequestEnum, ResultEnum, ContentTypeEnum } from '~~/enums/httpEnum';

import { isString } from '~~/utils/is';
import { setObjToUrlParams, deepMerge } from '~~/utils';
import { createNow, formatRequestDate } from './helper';
import qs from 'qs';

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformRequestResult, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformRequestResult) {
      return res.data;
    }
    // 错误的时候返回

    const { data } = res;
    if (!data) {
      // 返回“[HTTP]请求没有返回值”；
      throw new Error("报错了");
    }
    const { code, data: resData, msg } = data;

    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    if (!hasSuccess || code !== 0) {
      // 失败
      if (msg) {
        // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
        if (options.errorMessageMode === 'modal') {
          // createErrorModal({ title: t('sys.api.errorTip'), content: msg });
        } else if (options.errorMessageMode === 'message') {
          // createMessage.error(msg);
        }
      }
      throw new Error(msg);
    }else{
      // 成功
      return resData;
    }
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options;

    if (joinPrefix) {
      config.url = `${'地址前缀 /api 目前项目暂时没有，所以先不加配置'}${config.url}`;
    }

    // console.log(config.url)

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, createNow(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${createNow(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (
        (!isString(params) && config.url?.includes('/admin/goods/addGoods')) ||
        (!isString(params) && config.url?.includes('/admin/goods/updGoods')) ||
        (!isString(params) && config.url?.includes('/admin/miner/addFilMiner')) ||
        (!isString(params) && config.url?.includes('/admin/miner/updFilMiner')) ||
        (!isString(params) && config.url?.includes('/admin/news/addNew')) ||
        (!isString(params) && config.url?.includes('/admin/news/updNew'))
      ) {
        formatDate && formatRequestDate(params);
        config.data = params;
        config.params = undefined;
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, config.data);
        }
      }
      
      // if (!isString(params)) {
      //   formatDate && formatRequestDate(params);
      //   config.data = params;
      //   config.params = undefined;
      //   if (joinParamsToUrl) {
      //     config.url = setObjToUrlParams(config.url as string, config.data);
      //   }
      // } else {
      //   // console.log(222);
      //   // // 兼容restful风格
      //   // config.url = config.url + params;
      //   // config.params = undefined;
      // }
      // if (!config.url?.includes('/api/Manager/Common/Upload')) {
      //   config.url = `${config.url}?${qs.stringify(params)}`;
      //   config.params = undefined;
      // }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 请求之前处理config
    // const token = getToken();
    // if (token) {
    //   // jwt token
    //   config.headers.token = token;
    // }
    // config.headers.AuthToken = token || '';
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    // const { t } = useI18n();
    // const errorLogStore = useErrorLogStoreWithOut();
    // errorLogStore.addAjaxErrorInfo(error);
    const { response, code, message } = error || {};
    const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        // createMessage.error(t('sys.api.apiTimeoutMessage'));
      }
      if (err?.includes('Network Error')) {
        // createErrorModal({
        //   title: t('sys.api.networkException'),
        //   content: t('sys.api.networkExceptionMsg'),
        // });
      }
    } catch (error) {
      throw new Error(error);
    }
    checkStatus(error?.response?.status, msg);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,
        // 接口可能会有通用的地址部分，可以统一抽取出来
        // 接口地址前缀，有些系统所有接口地址都有前缀，可以在这里统一加，方便切换
        // '/api'
        prefixUrl: '',
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: false,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformRequestResult: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: 'http://api-saas-dev.biqinghao.com',  
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
        },
      },
      opt || {}
    )
  );
}
export const defHttp = createAxios();

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//   },
// });
