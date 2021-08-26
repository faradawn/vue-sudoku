const { createEmpty, fillFirstThree, getAvailable } = require('./utils')

module.exports = {
  createBoard_v3
}

/**
 * v3 三宫法
 */
function createBoard_v3 () {
  const start = new Date().getTime()
  const board = algorithm_v3()
  const end = new Date().getTime()
  return { matrix: board, time: end - start }
}

/**
   * 回溯法v3.0
   */
function algorithm_v3 () {
  const matrix = fillFirstThree(createEmpty())
  const backArr = []
  let i = -1; let j = -1; let k = 0
  while (++i < 9) {
    while (++j < 9) {
      switch (Math.floor(i / 3)) {
        case 0:
          if (j <= 2) { j = 3 }
          break
        case 1:
          if (j >= 3 && j <= 5) { j = 6 }
          break
        default:
          if (j >= 6 && i < 8) { j = 0; i++ } else if (j >= 6 && i === 8) { return matrix };
      }
      const ableArr = getAvailable(matrix, i, j)
      if (ableArr.length > 0) {
        const r = Math.floor(Math.random() * ableArr.length)
        matrix[i][j] = ableArr.splice(ableArr.indexOf(r), 1)[0]
        backArr[k] = ableArr
        k++
      } else {
        do {
          k--
          switch (Math.floor(i / 3)) {
            case 0:
              if (j <= 3) { j = 8; i-- } else { j-- }
              break
            case 1:
              if (j === 6) { j = 2 } else if (j <= 0) { j = 8; i-- } else { j-- }
              break
            default:
              if (j <= 0 && i === 6) { j = 8; i-- } else if (j <= 0 && i > 6) { j = 5; i-- } else { j-- }
          }
          matrix[i][j] = ''
        } while (backArr[k].length === 0)
        matrix[i][j] = backArr[k].pop()
        k++
      }
    }
    if (j >= 8) {
      j = -1
    }
  }
  return matrix
}
