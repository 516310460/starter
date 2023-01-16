/**
* 分页基本接口Model
*/
// export interface PaginationDTO<T extends any> {
//   // 是否成功
//   page: Boolean;
//   // 错误码
//   size: Number;
//   // 错误信息
//   errorMessage: string;
//   // 数据
//   data?: T;
// }
export interface PaginationModel {
  // 当前页
  page: number;
  // 每页显示条数
  size: number;
}
