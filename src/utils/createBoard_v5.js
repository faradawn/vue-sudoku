const { createEmpty_new, getAvailable_new, createHoles, shuffleFisher } = require('./utils')
module.exports = {
  createBoard_v5
}

/**
 * v5 最终优化
 */
function createBoard_v5 (num) {
  const start = new Date().getTime()
  const board = algorithm_v5()
  createHoles(board, num)
  const end = new Date().getTime()
  return { matrix: board, time: end - start }
}

// v5 裸函数: 一万次 1.0 秒左右
function algorithm_v5 () {
  const matrix = createEmpty_new()
  const backArr = []
  let i = -1; let j = -1; let k = 0
  while (++i < 9) {
    while (++j < 9) {
      const ableArr = shuffleFisher(getAvailable_new(matrix, i, j))
      if (ableArr.length > 0) {
        matrix[i][j] = ableArr.pop()
        backArr[k] = ableArr
        k++
      } else {
        do {
          if (j === 0) { j = 8; i-- } else { j-- }
          k--
          matrix[i][j] = ''
        } while (backArr[k].length === 0)
        matrix[i][j] = backArr[k].pop()
        k++
      }
    }
    j = -1
  }
  return matrix
}
