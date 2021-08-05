const { testTime, createEmpty,createHoles, fillFirstThree, getAvailable, checkBoard, shuffleFisher } = require('./utils');

module.exports = {
  createBoard_v4
}

// test();
function test(){
  var counter = 0;
  for(let i = 1; i<20; i++){
    counter += testTime(createBoard_v4, 50, 50);
  }
  console.log('avg', counter/20)
  // v3.0 原始，avg 1.62ms
  // v3.1 打乱 ableArr，avg 1.51ms, 随机取出 1.37ms
  // v3.2 行列, avg 0.052ms，不随机取 0.050ms 
}

/**
 * 回溯法生成，输出matrix和time
 * @param {number} num 
 * @returns 
 */
 function createBoard_v4(num){
  var start = new Date().getTime();
  var board = createRowTrace();
  createHoles(board, num);
  var end = new Date().getTime();
  return {matrix: board, time: end-start};
}

 
function createRowTrace(){
  var matrix = createEmpty();
  var backArr = []; 
  let i = -1; j = -1; k = 0;
  while(++i<9){
    while(++j<9){
      let ableArr = getAvailable(matrix, i, j);
      if(ableArr.length > 0){ 
        let r = Math.floor(Math.random()*ableArr.length);
        matrix[i][j] = ableArr.splice(ableArr.indexOf(r), 1)[0];
        // matrix[i][j] = ableArr.pop();
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
  }
  return matrix;
}