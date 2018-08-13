import {request} from '@/utils/requestExample'

export async function getPrizeInfo() {
  let response = await request("/api/getPrizeInfo", "get");
  return response.data;
}
