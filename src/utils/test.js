function getSqr(matrix, i, j){
  // 一亿次，0.813 vs 5.78
  i = Math.floor(i/3)*3
  j = Math.floor(j/3)*3
  return [
    matrix[i][j], matrix[i][j+1], matrix[i][j+2], 
    matrix[i+1][j], matrix[i+1][j+1], matrix[i+1][j+2],
    matrix[i+2][j], matrix[i+2][j+1], matrix[i+2][j+2]];
}

function mergeArrNew(a,b,c){
  // set 0.884 vs 原始array 0.53 -> 统一filter 0.31
  let arr = [...a, ...b, ...c]; 
  let ableSet = new Set([1,2,3,4,5,6,7,8,9]); 
  arr.map(v => ableSet.delete(v));
  return ableSet;
}

function mergeArrOld(a,b,c){
  let arr = [...a, ...b, ...c];
  let ableArr = [1,2,3,4,5,6,7,8,9,''];
  return ableArr.filter(v => arr.indexOf(v) === -1);
}

function getAvailable(matrix, i, j){
  let col = matrix.map((val) => val[j])
  let row = matrix[i]
  // let sqr = getSqr(matrix,i,j);
  // return mergeArr(col, row, sqr);
}

var a = [
  [1,2,3,4,5,6,7,8,9],
  [1,2,3,4,5,6,7,8,9],
  [1,2,3,4,5,6,7,8,9],
  [1,2,3,11,12,'',7,8,9],
  [1,2,3,14,'',16,7,8,9],
  [1,2,3,17,18,19,7,8,9],
  [1,2,3,4,5,6,7,8,9],
  [1,2,3,4,5,6,7,8,9],
  [1,2,3,4,5,6,7,8,9]
]

function test(){
  for(let i =0; i <1000000; i++){
    mergeArrOld([3,4,1,9,3], ['',2,9,4,''], [9,6,3,5,5,1]);
  }
  console.log('done')
}
console.log(mergeArrOld([3,4,1,5], [1,2,'',9,''], [9,6,1]));
test()