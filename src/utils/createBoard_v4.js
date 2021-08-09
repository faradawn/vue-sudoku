const { testTime, createEmpty,createHoles, fillFirstThree, getAvailable, checkBoard, shuffleFisher } = require('./utils');

module.exports = {
  createBoard_v4
}

test();
function test(){
  var counter = 0;
  for(let i = 0; i<49; i++){
    counter += testTime(createBoard_v4, 50, 200);
  }
  console.log('时间', counter/50)
  // v4.0, 0.0231
  // createEmpty: 改单循环 0.0215 -> 删除二维声明 0.0205 -> 全手写 0.0200
  // 用push和pop取代k: 0.0200（无变化）
  // getAvaible: 0.0179
  // getSqr算格子取代双循环
  // mergeArr 先三数组合并，再用set过滤
  //// set 0.884 vs 原始array 0.53 -> 统一filter 0.31
  // 
  // TODO: 棋盘 ableArr 整体换成 set ？set.find vs arr[i] 索引哪个快
  // TODO: 棋盘变成一维set值不值？
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
  let i = -1, j = -1;
  while(++i<9){
    while(++j<9){
      let ableArr = getAvailable(matrix, i, j);
      if(ableArr.length > 0){ 
        matrix[i][j] = ableArr.pop();
        backArr.push(ableArr)
      } else {
        do{
          if(j === 0) {j=8; i--}
          else {j--}
          backArr.pop()
          matrix[i][j] = '';
        } while(backArr[k].length === 0) 
        matrix[i][j] = backArr[backArr.length-1].pop();
      }
    }
  }
  return matrix;
} // 