export default function range(
  start: number,
  count: number,
  itemsAmount: number
): number[] {
  let end = Math.ceil(count / itemsAmount);
  let ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}
