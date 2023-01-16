/**
* 分页基本接口DTO
* @param 
* 约束参数T为数组类型，
* 判断T是否为数组，如果是数组类型则推导数组元素的类型
* <T extends Array<any>>
*/
export interface PaginationDTO {
  // 总条数
  count: number;
  // 分页返回数据
  data: Array<any>;
}