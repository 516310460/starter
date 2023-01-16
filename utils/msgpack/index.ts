import { Encoder } from "./Encoder";
import { Decoder } from "./Decoder";

export * from "./Encoder";
export * from "./Decoder";

/**
 * 将js版本改成TS
 * 将值编码为MsgPack二进制格式
 * encode.encoder.
 * 
 * @param value   要编码的数据
 * @param reserve 如果提供且尺寸大于当前编码缓冲区，此的新缓冲区尺寸将保留。
 */
export function encode(obj: any, initBuffSize?: number): Uint8Array
{
    return encode.encoder.encode(obj, initBuffSize);
}
encode.encoder = new Encoder();
// 冻结一个对象，不允许修改对象
Object.freeze(encode);

/**
 * 将js版本改成TS
 * 解码遇到的第一个MsgPack值
 * decode.decoder.
 * 
 * @param data 要编码的数据
 */
export function decode<T = any>(data: ArrayBuffer | Uint8Array): T
{
    return decode.decoder.decode<T>(data);
}
decode.decoder = new Decoder();
// 冻结一个对象，不允许修改对象
Object.freeze(decode);