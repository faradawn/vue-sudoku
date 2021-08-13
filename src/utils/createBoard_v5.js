const { createEmpty_new, getAvailable_new, createHoles, shuffleFisher } = require('./utils');
module.exports = {
  createBoard_v5
}

/**
 * v5 最终优化
 */
 function createBoard_v5(num){
  var start = new Date().getTime();
  var board = algorithm_v5();
  createHoles(board, num);
  var end = new Date().getTime();
  return {matrix: board, time: end-start};
}

function algorithm_v5(){
  var matrix = createEmpty_new();
  var backArr = [];
  let i = -1; j = -1; k = 0;
  while(++i<9){
    while(++j<9){
      let ableArr = shuffleFisher(getAvailable_new(matrix, i, j));
      if(ableArr.length > 0){ 
        matrix[i][j] = ableArr.pop();
        backArr[k] = ableArr;
        k++;
      } else {
        do{
          if(j === 0) {j=8; i--}
          else {j--}
          k--;
          matrix[i][j] = '';
        } while(backArr[k].length === 0)
        matrix[i][j] = backArr[k].pop();
        k++;
      }
    }
    j = -1;
  }
  return matrix;
}