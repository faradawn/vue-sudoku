createBoard();
/**
 * 生成随机棋盘
 * @return {[[]]} 二维数组
 */
export function createBoard(){
  var board = createEmpty();
  fillFirstThree(board);
  board = fillRest(board);
  createHoles(board, 10);
  console.log('生成的棋盘', board);

  var userInput = [];
  checkBoard(board, userInput);

}

function checkBoard(matrix, inputArr){
  for(let i = 0; i < inputArr.length; i++){
    matrix[inputArr[i].x][inputArr[i].y] = '';
    if(!checkCell(inputArr[i], matrix)){
      console.log('答案有误', inputArr[i]);
      matrix[inputArr[i].x][inputArr[i].y] = inputArr.val;
      return false;
    }
    matrix[inputArr[i].x][inputArr[i].y] = inputArr.val;
  }
  return true;
}

export function checkCell(cell, matrix){
  var r = cell.x, c = cell.y, val = cell.val;
  if(!val){
    console.log('value to check', val);
    return false;
  }
  for(let i = 0; i < 9; i++){
    if(matrix[r][i] === val || matrix[i][c] === val)
      return false;
  }
  var row = Math.floor(r/3);
  var col = Math.floor(c/3);
  for(let i = 3*row; i < 3*row+3; i++){
    for(let j = 3*col; j < 3*col+3; j++){
      if(matrix[i][j] === val)
        return false;
    }
  }
  return true;
}

function createHoles(matrix, num){
  var pickArr = [];
  while(num > 0){
    let x = Math.floor(Math.random()*9)
    let y = Math.floor(Math.random()*9)
    if(!pickArr.find(v => v.x===x && v.y===y)){
      let cell = {x: x, y: y, val: matrix[x][y]};
      pickArr.push(cell);
      matrix[cell.x][cell.y] = '';
      num --;
    }
  }
  return matrix;
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
  return matrix;
}

function fillFirstThree(matrix){

  function fisherShuffle(arr){
    let i = arr.length;
    while(i > 0){
      let r = Math.floor(Math.random() * i--);
      [arr[i], arr[r]] = [arr[r], arr[i]];
    }
    return arr;
  }

  let iter = -1, k = 0;
  while(++iter < 3){
    var nineArray = fisherShuffle([1,2,3,4,5,6,7,8,9]);
    for(let i = iter*3; i < iter*3+3; i++){
      for(let j = iter*3; j < iter*3+3; j++){
        matrix[i][j] = nineArray[k];
        k++;
      }
    }
    k = 0;
  }
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

