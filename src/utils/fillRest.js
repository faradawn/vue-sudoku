import { checkValid } from './checkValid.js';
import { fillFirstThree } from './fillFirstThree.js';


main()
function main(){
  var board = fillFirstThree(createEmpty());
  fillRest(board);

}

// 为什么 deepcopy 只有第一次能用？
function fillRest(a){
  var counter = 0;

  do{
    var matrix = JSON.parse(JSON.stringify(a));
    
    outerLoop:
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(matrix[i][j] === ''){
          var thisCol = matrix.map((val) => val[j]).filter(v => v);
          var thisRow = matrix[i].filter((v) => v);
          var thisSqr = getSqr(matrix,i,j);
          var ableArr = mergeArr(thisCol, thisRow, thisSqr);
          let k = -1;
          while(++k < ableArr.length){
            if(checkValid(ableArr[k])){
              matrix[i][j] = ableArr[k];
              console.log('yay filled row', [...matrix[i]]);
              continue;
            } 
          }
          console.log()
          break outerLoop;
        
        }
      }
    }

    counter ++;
  } while(!isFilled(matrix))
  
  console.log('success', counter, matrix);
  return matrix;
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
  return arr2;
}
