import { request } from '@/utils/request';

export function getRoomList() {
  return request.httpRequestGet('api/12321/12312', {});
}
