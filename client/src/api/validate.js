import {request} from '@/utils/requestExample'

export async function validate(data) {
  let response = await request("/api/validate", "get", data);
  return response.data;
}
