const { testTime, createEmpty,createHoles, isFilled, getAvailable, checkBoard, shuffleFisher } = require('./utils');

module.exports = {
  createBoard_v4
}
/**
 * v4 原始行列法
 */
function createBoard_v4(num){
  var start = new Date().getTime();
  var board = algorithm_v4();
  createHoles(board, num);
  var end = new Date().getTime();
  return {matrix: board, time: end-start};
}

function algorithm_v4(){
  var matrix = createEmpty();
  var backArr = []; 
  let i = -1; j = -1; k = 0;
  while(++i<9){
    while(++j<9){
      let ableArr = getAvailable(matrix, i, j);
      if(ableArr.length > 0){ 
        let r = Math.floor(Math.random()*ableArr.length);
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

// test();
// function test(){
//   var counter = 0;
//   for(let i = 1; i<20; i++){
//     counter += testTime(createBoard_v4, 50, 50);
//   }
//   console.log('avg', counter/20)
// }
