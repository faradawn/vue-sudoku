const { testTime, createEmpty,createHoles, fillFirstThree, getAvailable, checkBoard, shuffleFisher, isFilled } = require('./utils_new');

module.exports = {
  createBoard_v4_1
}

/**
 * v4.1 优化回溯法
 */
 function createBoard_v4_1(num){
  var start = new Date().getTime();
  var board = algorithm_v4_1();
  createHoles(board, num);
  var end = new Date().getTime();
  return {matrix: board, time: end-start};
}

function algorithm_v4_1(){
  var matrix = createEmpty(); // 新版
  var backArr = [], ableArr = [];
  let i = -1; j = -1; k = 0;
  while(++i<9){
    while(++j<9){
      ableArr = getAvailable(matrix, i, j); // 新版
      if(ableArr.length > 0){ 
        let r = Math.floor(Math.random()*ableArr.length); // 换成打乱数组？
        matrix[i][j] = ableArr.splice(ableArr.indexOf(r), 1)[0];
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

algorithm_v4_1()
// test();
function test(){
  var counter = 0;
  for(let i = 0; i<49; i++){
    counter += testTime(createBoard_v4_1, 50, 200);
  }
  console.log('时间', counter/50)
  // v4.0, 0.0231
  // createEmpty: 改单循环 0.0215 -> 删除二维声明 0.0205 -> 全手写 0.0200
  // getAvaible: 0.0179
  // getSqr算格子取代双循环
  // mergeArr 先三数组合并，再用set过滤
  //// set 0.884 vs 原始array 0.53 -> 统一filter 0.31
  // 用lenght取代k变慢很多
  // TODO: 棋盘 ableArr 整体换成 set ？set.find vs arr[i] 索引哪个快
  // TODO: 棋盘变成一维set值不值？
  // TODO: 第一行都是1-9
}
