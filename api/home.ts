import { defHttp } from '~~/utils/http/axios';

/**
* api首页接口
*/
enum Api {
  // banner列表
  bannerList = '/home/banner/list',
  // 公告列表
  noticeList = '/home/notice/list',
  // 行情列表
  marketList = '/home/market/list',
  // 推广列表
  promotionList = '/home/promotion/list',
  // 关于我们
  aboutUsList = '/home/aboutUs/list',
  // 页脚信息
  footerList = '/home/config/list',
  // 区域列表
  areaList = '/home/area/list',
  // 支持货币
  unitList = '/home/unit/list',
  // 注册时展示的协议列表
  regRules = '/home/config/regRules'
}

// banner列表
export const bannerListApi = (params?: any) => defHttp.get<any>({ url: Api.bannerList, params });

// 公告列表
export const noticeListApi = (params?: any) => defHttp.get<any>({ url: Api.noticeList, params });

// 行情列表
export const marketListApi = (params: any) => defHttp.get<any>({ url: Api.marketList, params });

// 推广列表
export const promotionListApi = (params: any) => defHttp.get<any>({ url: Api.promotionList, params });

// 关于我们
export const aboutUsListApi = (params: any) => defHttp.get<any>({ url: Api.aboutUsList, params });

// 页脚信息
export const footerListApi = (params: any) => defHttp.get<any>({ url: Api.footerList, params });

// 区域列表
export const areaListApi = (params: any) => defHttp.get<any>({ url: Api.areaList, params });

// 支持货币
export const unitListApi = (params: any) => defHttp.get<any>({ url: Api.unitList, params });

// 注册时展示的协议列表
export const regRulesApi = (params: any) => defHttp.get<any>({ url: Api.regRules, params });