import { checkValid } from './checkValid.js';
import { fillFirstThree } from './fillFirstThree.js';

function fillRest(matrix){
  for(let i = 0; i < 9; i++){
    var restEle = [...Array(10).keys()].slice(1).filter(v => matrix[i].indexOf(v) === -1);
    console.log('iter',i, 'restEle', restEle);
    for(let j = 0; j < 9; j++){
      if(matrix[i][j] === ''){
        var val, k = 0;
        do{
          val = restEle[k++];
          if(k >= 7){
            console.log('k too big !!!', k)
            console.log('matrix row',i, matrix[i]);
            console.log('restEle', restEle);
            return;
          }
        } while(!checkValid(i,j,val,matrix))
        let putVal = restEle.splice(k-1, 1)[0];
        if(!putVal){
          console.log('slice eroor', k);
          console.log('matrix row',i, matrix[i]);
          console.log('restEle', restEle);
          return;
        }
        matrix[i][j] = putVal;
        console.log('matrix row',i, matrix[i]);
        console.log('restEle', restEle);
      }
    }
  }
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

var matrix = fillFirstThree(createEmpty());

fillRest(matrix)
