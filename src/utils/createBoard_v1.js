const {testTime, createHoles, createEmpty, fillFirstThree, isFilled, getAvailable, shuffleFisher} = require('./utils');

module.exports = {
  createBoard_v1
}

// console.log(testTime(createBoard_v1, 50, 50));

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


function fillRest(a){
  var counter = 0;
  do{
    var matrix = JSON.parse(JSON.stringify(a)); // 为什么 a.slice() 好像不行？
    outerLoop:
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(!matrix[i][j]){
          let ableArr = getAvailable(matrix, i, j);
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

