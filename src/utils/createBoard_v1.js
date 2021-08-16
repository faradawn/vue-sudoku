const { createHoles, createEmpty, fillFirstThree, isFilled, getAvailable } = require('./utils')

module.exports = {
  createBoard_v1
}

/**
 * 生成指定难度的棋盘
 * @param {number} num 挖空数量
 * @returns
 */
function createBoard_v1 (num) {
  const start = new Date().getTime()
  let board = createEmpty()
  fillFirstThree(board)
  board = fillRest(board)
  createHoles(board, num)
  const end = new Date().getTime()
  return { matrix: board, time: end - start }
}

function fillRest (a) {
  do {
    // eslint-disable-next-line no-var
    var matrix = JSON.parse(JSON.stringify(a))
    outerLoop:
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!matrix[i][j]) {
          const ableArr = getAvailable(matrix, i, j)
          if (ableArr.length === 0) {
            break outerLoop
          }
          matrix[i][j] = ableArr[Math.floor(Math.random() * ableArr.length)]
        }
      }
    }
  } while (!isFilled(matrix))
  return matrix
}
