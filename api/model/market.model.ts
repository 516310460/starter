import { BaseType } from "../base.type";

type exchange = Pick<BaseType, 'exchange'>
type contract_code = Pick<BaseType, 'contract_code'>
type start_time = Pick<BaseType, 'start_time'>
type end_time = Pick<BaseType, 'end_time'>
type inst_type = Pick<BaseType, 'inst_type'>

/**
* 获取k线Model
*/
export interface KlineModel extends exchange, contract_code, start_time, end_time, inst_type {
  // 间隔时间 1min 5min 15min 30min 1hour 4hour 1day 1week 1mon
  interval: string;
}

/**
* 获取深度Model
*/
export interface DeptModel extends exchange, contract_code, inst_type {}

/**
* 获取行情Model
*/
export interface TickerModel extends exchange, contract_code, inst_type {}

/**
* 获取交易Model
*/
export interface TradeModel extends exchange, contract_code, inst_type {}

/**
* 获取行情溢出价Model
*/
export interface MarkPriceModel extends exchange, contract_code {}

/**
* 获取行情详细Model
*/
export interface MarketdetailsModel extends exchange, contract_code {}