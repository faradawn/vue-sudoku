module.exports = {
  createEmpty,
  createHoles,
  testTime,
  checkBoard,
  checkCell,
  checkInput,
  shuffleFisher,
  getSqr,
  isFilled,
  mergeArr,
}

/**
 * 创建空的二维数组
 * @returns 
 */
 function createEmpty(){
  var board = Array.from(Array(9), () => new Array(9));
  for(let i = 0; i<9; i++){
    for(let j = 0; j<9; j++){
      board[i][j] = '';
    }
  }
  return board;
}

/**
 * 检测用户输入
 * @param {[[]]} matrix 
 * @param {[]} inputArr 
 * @returns 
 */
function checkInput(matrix, inputArr){
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
/**
 * 检测整个棋盘
 * @param {[[]]} matrix 
 * @returns 
 */
function checkBoard(matrix){
  let i = -1, j = -1;
  while(++i<9){
    while(++j<9){
      let temp = matrix[i][j];
      matrix[i][j] = '';
      if(!checkCell({x:i, y:j, val:temp}, matrix)){
        console.log('which cell error',i,j, matrix[i])
        return false;
      }
      matrix[i][j] = temp;
    }
  }
  return true;
}
/**
 * 检测单格是否合法
 * @param {object} cell {x:0 ,y:0}
 * @param {[[]]} matrix 
 * @returns 
 */
function checkCell(cell, matrix){
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

/**
 * 给数组挖空
 * @param {*} matrix 
 * @param {*} num 
 * @returns 
 */
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

/**
 * 把数组洗牌
 * @param {*} arr 
 * @returns 
 */
 function shuffleFisher(arr){
  let i = arr.length;
  while(i > 0){
    let r = Math.floor(Math.random() * i--);
    [arr[i], arr[r]] = [arr[r], arr[i]];
  }
  return arr;
}

/**
 * 测试生成棋盘速度
 * @param {function} fn 测试的函数
 * @param {number} num 挖多少空
 * @param {numer} times 跑多少次
 * @returns 
 */
 function testTime(fn, num, times){
  var sum = 0;
  for(let i = 0; i < times; i++){
    sum += fn(num).time;
  }
  return sum/times;
}