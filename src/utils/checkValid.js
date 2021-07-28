
export function checkValid(r, c, val, matrix){
  if(!val){
    console.log('check val is', val);
    return false;
  }
  // 判断行和列
  for(let i = 0; i < 9; i++){
    if(matrix[r][i] === val || matrix[i][c] === val)
      return false;
  }
  // 判断所在九宫格
  var row = Math.floor(r/3), col = Math.floor(c/3);
  for(let i = 3*row; i < 3*row+3; i++){
    for(let j = 3*col; j < 3*col+3; j++){
      if(matrix[i][j] === val)
        return false;
    }
  }
  return true;
}

// var matrix = [
//   [8,3,5,4, ,6,9,2,7],
//   [2,9,6,8,5,7,4,3,1],
//   [4,1,7,2,9,3,6,5,8],
//   [5,6,9,1, ,4,7,8,2],
//   [1,2,3,6,7,8,5,4,9],
//   [7,4,8,5,2,9,1,6,3],
//   [6,5,2,7,8,1,3,9,4],
//   [9,8,1,3,4,5,2, ,6],
//   [3,7,4,9,6,2,8,1,5]
// ]

// console.log(checkValid(7, 7, 7, matrix))

let arr = [1,2,3]
console.log(arr.splice(0,1)[0])