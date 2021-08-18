module.exports = {
  createEmpty,
  createHoles,
  fillFirstThree,
  checkBoard,
  checkCell,
  checkInput,
  shuffleFisher,
  isFilled,
  getAvailable,
  getAvailable_indexOf,
  testTime,
  testPure
}

function testPure (fn, times) {
  const start = new Date().getTime()
  for (let i = 0; i < times; i++) {
    fn()
  }
  const end = new Date().getTime()
  console.log('用时', end - start)
  return end - start
}

/**
 * 创建空的二维数组
 * @returns
 */
function createEmpty () {
  return [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '']
  ]
}

/**
 * 获取可用的数字
 * @param {[[]]} matrix
 * @param {number} i
 * @param {number} j
 * @returns
 */
function getAvailable (matrix, i, j) {
  function getSqr (matrix, r, c) {
    const row = Math.floor(r / 3); const col = Math.floor(c / 3)
    const arr = []
    for (let i = 3 * row; i < 3 * row + 3; i++) {
      for (let j = 3 * col; j < 3 * col + 3; j++) {
        if (matrix[i][j]) { arr.push(matrix[i][j]) }
      }
    }
    return arr
  }
  function mergeArr (a, b, c) {
    const arr1 = [...a, ...b.filter((v) => a.indexOf(v) === -1)]
    const arr2 = [...c, ...arr1.filter((v) => c.indexOf(v) === -1)]
    const arrSD = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return arrSD.filter(v => arr2.indexOf(v) === -1)
  }
  const col = matrix.map((val) => val[j])
  const row = matrix[i]
  const sqr = getSqr(matrix, i, j)
  return mergeArr(col, row, sqr)
}

function getAvailable_indexOf (matrix, i, j) {
  const ableArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (let a = 0; a < j; a++) { // 行
    const p = ableArr.indexOf(matrix[i][a])
    ableArr.splice(p, 1)
  }
  for (let b = 0; b < i; b++) { // 列
    const p = ableArr.indexOf(matrix[b][j])
    if (p !== -1) {
      ableArr.splice(p, 1)
    }
  }
  if (ableArr.length === 0) { // 提前终止
    return []
  }
  for (let x = Math.floor(i / 3) * 3; x < i; x++) { // 宫格
    for (let y = Math.floor(j / 3) * 3; y < Math.floor(j / 3) * 3 + 3; y++) {
      const p = ableArr.indexOf(matrix[x][y])
      if (p !== -1) {
        ableArr.splice(p, 1)
      }
    }
  }
  return ableArr
}

/**
 * 检查棋盘是否填满
 * @param {[]} matrix
 * @returns
 */
function isFilled (matrix) {
  let i = -1; let j = -1
  while (++i < 9) {
    while (++j < 9) {
      if (!matrix[i][j]) { return false }
    }
    j = -1
  }
  return true
}
/**
 * 检测整个棋盘
 * @param {[[]]} matrix
 * @returns
 */
function checkBoard (matrix) {
  let i = -1; let j = -1
  while (++i < 9) {
    while (++j < 9) {
      const temp = matrix[i][j]
      matrix[i][j] = ''
      if (!checkCell({ x: i, y: j, val: temp }, matrix)) {
        console.log('which cell error', i, j, matrix[i])
        return false
      }
      matrix[i][j] = temp
    }
  }
  return true
}
/**
 * 检测用户输入
 * @param {[[]]} matrix
 * @param {[]} inputArr
 * @returns
 */
function checkInput (matrix, inputArr) {
  for (let i = 0; i < inputArr.length; i++) {
    matrix[inputArr[i].x][inputArr[i].y] = ''
    if (!checkCell(inputArr[i], matrix)) {
      console.log('答案有误', inputArr[i])
      matrix[inputArr[i].x][inputArr[i].y] = inputArr.val
      return false
    }
    matrix[inputArr[i].x][inputArr[i].y] = inputArr.val
  }
  return true
}

/**
 * 检测单格是否合法
 * @param {object} cell {x:0 ,y:0}
 * @param {[[]]} matrix
 * @returns
 */
function checkCell (cell, matrix) {
  const r = cell.x; const c = cell.y; const val = cell.val
  if (!val) {
    console.log('value to check', val)
    return false
  }
  for (let k = 0; k < 9; k++) {
    if (matrix[r][k] === val || matrix[k][c] === val) { return false }
  }
  const row = Math.floor(r / 3)
  const col = Math.floor(c / 3)
  for (let i = 3 * row; i < 3 * row + 3; i++) {
    for (let j = 3 * col; j < 3 * col + 3; j++) {
      if (matrix[i][j] === val) { return false }
    }
  }
  return true
}
/**
 * 给数组挖空
 * @param {*} matrix
 * @param {*} num
 * @returns
 */
function createHoles (matrix, num) {
  const pickArr = []
  while (num > 0) {
    const x = Math.floor(Math.random() * 9)
    const y = Math.floor(Math.random() * 9)
    if (!pickArr.find(v => v.x === x && v.y === y)) {
      const cell = { x: x, y: y, val: matrix[x][y] }
      pickArr.push(cell)
      matrix[cell.x][cell.y] = ''
      num--
    }
  }
  return matrix
}
/**
 * 把数组洗牌
 * @param {*} arr
 * @returns
 */
function shuffleFisher (arr) {
  let i = arr.length
  while (i > 0) {
    const r = Math.floor(Math.random() * i--);
    [arr[i], arr[r]] = [arr[r], arr[i]]
  }
  return arr
}
// 更成 let i = Math.floor(arr.length / 2)
// 速度翻倍，0.96 -> 0.55
// 但棋盘时间从 560ms -> 1200ms
// 原因可能，最后元素未变

/**
 * 填入对角线三宫格
 * @param {*} matrix
 * @returns
 */
function fillFirstThree (matrix) {
  let iter = -1; let k = 0
  while (++iter < 3) {
    const nineArray = shuffleFisher([1, 2, 3, 4, 5, 6, 7, 8, 9])
    for (let i = iter * 3; i < iter * 3 + 3; i++) {
      for (let j = iter * 3; j < iter * 3 + 3; j++) {
        matrix[i][j] = nineArray[k]
        k++
      }
    }
    k = 0
  }
  return matrix
}
/**
 * 测试生成棋盘速度
 * @param {function} fn 测试的函数
 * @param {number} num 挖多少空
 * @param {numer} times 跑多少次
 * @returns
 */
function testTime (fn, num, times) {
  let sum = 0
  for (let i = 0; i < times; i++) {
    sum += fn(num).time
  }
  return sum / times
}
