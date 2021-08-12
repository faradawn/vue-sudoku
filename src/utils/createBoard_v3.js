const { testTime, createEmpty,createHoles, fillFirstThree, getAvailable, checkBoard } = require('./utils');

module.exports = {
  createBoard_v3
}

/**
 * v3 三宫法
 */
 function createBoard_v3(num){
  var start = new Date().getTime();
  var board = algorithm_v3();
  createHoles(board, num);
  var end = new Date().getTime();
  return {matrix: board, time: end-start}; 
}

  /**
   * 回溯法v3.0
   */
function algorithm_v3(){
  var matrix = fillFirstThree(createEmpty()); 
  var backArr = []; 
  let i = -1; j = -1; k = 0;
  while(++i<9){
    while(++j<9){
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
      let ableArr = getAvailable(matrix, i, j);
      if(ableArr.length > 0){ 
        let r = Math.floor(Math.random()*ableArr.length);
        matrix[i][j] = ableArr.splice(ableArr.indexOf(r), 1)[0];
        backArr[k] = ableArr;
        k++;
      } else {
        do{
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