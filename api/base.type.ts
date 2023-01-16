/**
* 基本接口类型
*/
export interface BaseType {
  // id
  id: number;
  // 邀请码
  code: number;
  // 开始时间
  start_time: string;
  // 结束时间
  end_time: string;
  // 交易所名称
  exchange: string;
  // 合约ID
  contract_code: string;
  // 类型 合约/现货(future/spot)
  inst_type: string;
  // trade: 现货传symbol的值 合约传contract_code的值
  symbol: string;
  // usdt 代表 u本位  其他币种代表币本位
  currency: string;
  // 钱包类型:
  // 1:充币，2:提币
  // 充提类型 1:手机，2:邮箱
  // 划转记录 1:合约交易转入 2:合约交易转出
  type: number | string;
  // 方向 buy sell
  side: string;
  // 现货订单类型 limit market trigger
  // 合约下单类型（ limit/限价 market/市价 trigger/计划委托 post_only/只做maker ）
  order_type: string;
  // 价格
  price: number;
  // 订单ID
  order_id: number;
  // token: 极验的token
  token: string;
  // 账号
  account: string;
}