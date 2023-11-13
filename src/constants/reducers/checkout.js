//get objects of distinct space type and get result that includes picture url
export function getSummaryInfo(obj) {
  let f = obj.filter((item) => +item.row_num === 1);
  let p = obj.find((item) => item.picture);
  if (p){
    f.concat(p);
  }
  return f;
}
