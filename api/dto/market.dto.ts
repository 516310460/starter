import { BaseType } from "../base.type"
import { PaginationDTO } from "./base.dto"

// 提取
type id = Pick<BaseType, 'id'>
type code = Pick<BaseType, 'code'>

/**
* 30日成交量 & 返佣比例DTO
*/
export interface InvitationDefaultDTO {
  // 好友近30日交易量
  trade_amount: number;
  // 总返佣比例
  commission_rate: number;
}

/**
* 所有邀请码（用于筛选邀请码）DTO
*/
export interface InvitationListDTO extends id, code {}

/**
* 返佣数据汇总DTO
*/
export interface CommissionDataDTO {
  // 合伙人返佣（我的返佣）
  sum_partner_commission: string;
  // 助力人返佣
  sum_helper_commission: string;
  // 交易过的好友
  count_trade_invitee: number;
  // 邀请好友数量
  count_invitee: number;
}

/**
* 导出任务列表DTO
*/
export interface ExportTaskListDTO extends PaginationDTO {
  // 剩余导出次数
  count_export: number;
}

/**
* 下载导出任务链接DTO
*/
export interface ExportTaskDownloadUrlDTO {
  // 下单链接
  download_url: string;
}

/**
* 邀请链接详情DTO
*/
export interface InvitationShowDTO extends id {
  // 合伙人返佣比例（我的返佣比例）
  partner_commission_rate: string;
  // 助力人返佣比例
  helper_commission_rate: string;
  // 好友返佣比例
  invitee_commission_rate: string;
  // 是否为默认链接 1是0否
  is_default: number;
}