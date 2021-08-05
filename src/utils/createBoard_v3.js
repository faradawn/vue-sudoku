const { testTime, createEmpty,createHoles, fillFirstThree, getAvailable, checkBoard } = require('./utils');


console.log(testTime(createBoard_v3, 50, 50));

/**
 * 回溯法生成，输出matrix和time
 * @param {number} num 
 * @returns 
 */
 function createBoard_v3(num){
  var start = new Date().getTime();
  var board = createBackTrace();
  createHoles(board, num);
  var end = new Date().getTime();
  return {matrix: board, time: end-start};
}

  /**
   * 回溯法生成棋盘
   */
function createBackTrace(){
  var matrix = fillFirstThree(createEmpty()); // 先生成对角的三个
  var backArr = []; // 存储回溯数组
  let i = -1; j = -1; k = 0;
  while(++i<9){
    while(++j<9){
      // 跳过生成好的三宫格
      switch(Math.floor(i/3)){
        case 0:
          if(j<=2) {j=3}
          break;
        case 1:
          if(j>=3&&j<=5) {j=6}
          break;
        default:
          if(j>=6&&i<8) {j=0; i++}
          else if(j>=6&&i===8) {return matrix};
      }
      // 来到新格子，收集可用的数，放入ableArr
      let ableArr = getAvailable(matrix, i, j);
      // 从ableArr取一个，填入格子
      if(ableArr.length > 0){ 
        matrix[i][j] = ableArr.pop();
        backArr[k] = ableArr;
        k++;
      // 如果ableArr空了，开始回溯
      } else {
        do{
          // 回到上一个还有可用数字的格子，换个新数字填入，并把一路上的格子清空
          k--;
          switch(Math.floor(i/3)){
            case 0:
              if(j<=3) {j=8; i--}
              else {j--}
              break;
            case 1:
              if(j===6) {j=2}
              else if(j<=0) {j=8; i--}
              else {j--}
              break;
            default:
              if(j<=0&&i===6) {j=8; i--}
              else if(j<=0&&i>6) {j=5; i--}
              else {j--}
          }
          matrix[i][j] = '';
        } while(backArr[k].length === 0)
        matrix[i][j] = backArr[k].pop();
        k++;
      }
    }
    if(j>=8){
      j = -1;
    }
  }
  return matrix;
}