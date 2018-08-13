import {request} from '@/utils/requestExample'

export async function drawWinners(data) {
  let response = await request("/api/draw", "get", data);
  let newWinners = response.data.newWinners;
  let newWinnersArr = (newWinners[newWinners.length - 1] + '').split('');
  let zeroQuantity = 5 - newWinnersArr.length;
  let zeroArr = [];
  for (let i = 0; i < zeroQuantity; i++) {
    zeroArr.push("0");
  }
  let winnerArr = zeroArr.concat(newWinnersArr);
  response.data.newWinners = winnerArr.join("");
  return response.data;
}
