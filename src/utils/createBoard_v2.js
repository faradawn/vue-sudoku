const { createEmpty, createHoles, shuffleFisher } = require('./utils')

module.exports = {
  createBoard_v2
}

/**
 * 用平移法创建棋盘，输出matrix和time
 * @returns
 */
function createBoard_v2 () {
  const start = new Date().getTime()
  const board = createParallex()
  const end = new Date().getTime()
  return { matrix: board, time: end - start }
}
/**
 * 平移法生成棋盘
 * @returns
 */
function createParallex () {
  const matrix = createEmpty()
  const row1 = shuffleFisher([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const shift = [3, 6, 1, 4, 7, 2, 5, 8]
  matrix[0] = row1
  for (let i = 0; i < shift.length; i++) {
    const copy_row1 = row1.slice()
    const row = copy_row1.concat(copy_row1.splice(0, shift[i]))
    matrix[i + 1] = row
  }
  return matrix
}
