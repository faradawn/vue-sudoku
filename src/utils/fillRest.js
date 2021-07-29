import { checkValid } from './checkValid.js';
import { fillFirstThree } from './fillFirstThree.js';

main();

function main(){
  var board = createEmpty();
  fillFirstThree(board);
  fillRest(board);

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
  console.log('完成棋盘！', counter, matrix);
}


function createEmpty(){
  var board = Array.from(Array(9), () => new Array(9));
  for(let i = 0; i<9; i++){
    for(let j = 0; j<9; j++){
      board[i][j] = '';
    }
  }
  return board;
}

function isFilled(matrix){
  let i = -1, j = -1;
  while(++i < 9){
    while(++j < 9){
      if(!matrix[i][j])
        return false;
    }
    j = -1;
  }
  return true;
}

function getSqr(matrix, r, c){
  var row = Math.floor(r/3), col = Math.floor(c/3);
  var arr = [];
  for(let i = 3*row; i < 3*row+3; i++){
    for(let j = 3*col; j < 3*col+3; j++){
      if(matrix[i][j])
        arr.push(matrix[i][j]);
    }
  }
  return arr;
}

function mergeArr(a,b,c){
  let arr1 = [...a, ...b.filter((v) => a.indexOf(v) === -1)];
  let arr2 = [...c, ...arr1.filter((v) => c.indexOf(v) === -1)];
  let arrSD = [1,2,3,4,5,6,7,8,9];
  return arrSD.filter(v => arr2.indexOf(v) === -1);
}
