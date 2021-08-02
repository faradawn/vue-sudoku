const {createHoles, createEmpty, isFilled, getSqr, mergeArr, shuffleFisher} = require('./utils');

module.exports = {
  createBoard_v1
}
/**
 * 生成指定难度的棋盘
 * @param {number} num 挖空数量
 * @returns 
 */
function createBoard_v1(num){
  var start = new Date().getTime();
  var board = createEmpty();
  fillFirstThree(board);
  board = fillRest(board);
  createHoles(board, num);
  var end = new Date().getTime();
  return {matrix: board, time: end-start};
}

function fillFirstThree(matrix){
  let iter = -1, k = 0;
  while(++iter < 3){
    var nineArray = shuffleFisher([1,2,3,4,5,6,7,8,9]);
    for(let i = iter*3; i < iter*3+3; i++){
      for(let j = iter*3; j < iter*3+3; j++){
        matrix[i][j] = nineArray[k];
        k++;
      }
    }
    k = 0;
  }
  return matrix;
}


function fillRest(a){
  var counter = 0;
  do{
    var matrix = JSON.parse(JSON.stringify(a)); // 为什么 a.slice() 好像不行？
    outerLoop:
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(!matrix[i][j]){
          let col = matrix.map((val) => val[j]).filter(v => v);
          let row = matrix[i].filter((v) => v);
          let sqr = getSqr(matrix,i,j);
          let ableArr = mergeArr(col, row, sqr);
          if(ableArr.length === 0){
            break outerLoop;
          }
          matrix[i][j] = ableArr[Math.floor(Math.random()*ableArr.length)];
        }
      }
    }
    counter ++;
  } while(!isFilled(matrix))
  return matrix;
}

