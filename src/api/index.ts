import { request } from '@/utils/request';
import IndexedDB from '@/utils/indexedDB';
export function getRoomList() {
  return request.httpRequestGet('api/12321/12312', {});
}

/**
 * mock
 */
const airbnbDB = new IndexedDB('airbnb');
export async function fetchElephant() {
  await airbnbDB.openStore('elephant', 'id', ['nose', 'ear']);
  let result = await airbnbDB.getList('elephant').then((res) => {
    return {
      code: '000000',
      message: '获取成功',
      result: res,
      success: true,
    };
  });
  console.log('result----------->', result);
  return result;
}
