import {request} from '@/utils/requestExample'

export async function getWinners() {
  let response = await request("/api/getWinners", "get");
  return response.data;
}
