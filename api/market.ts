import { defHttp } from '~~/utils/http/axios';
import { DeptModel, KlineModel, MarketdetailsModel, MarkPriceModel, TickerModel, TradeModel } from './model/market.model';

/**
* api行情接口
*/
enum Api {
  // 获取k线
  kline = '/market/quotation/kline',
  // 获取深度
  dept = '/market/quotation/dept',
  // 获取行情
  ticker = '/market/quotation/ticker',
  // 获取交易
  trade = '/market/quotation/trade',
  // 获取行情溢出价
  markPrice = '/market/quotation/markPrice',
  // 获取行情详细
  marketdetails = '/market/quotation/marketdetails'
}

// 获取k线
export const klineApi = (params: KlineModel) => defHttp.get<any>({ url: Api.kline, params });

// 获取深度
export const deptApi = (params: DeptModel) => defHttp.get<any>({ url: Api.dept, params });

// 获取行情
export const tickerApi = (params: TickerModel) => defHttp.get<any>({ url: Api.ticker, params });

// 获取交易
export const tradeApi = (params: TradeModel) => defHttp.get<any>({ url: Api.trade, params });

// 获取行情溢出价
export const markPriceApi = (params: MarkPriceModel) => defHttp.get<any>({ url: Api.markPrice, params });

// 获取行情详细
export const marketdetailsApi = (params: MarketdetailsModel) => defHttp.get<any>({ url: Api.marketdetails, params });