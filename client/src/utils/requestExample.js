const axios = require("axios");

export function request(url, method, data) {
  return axios({
    url: url,
    method: method,
    params: data
  });
}
