const { createEmpty, getAvailable, testPure } = require('./utils')

// v4 mergeArr: 一万次1.756s

function algorithm_v4 () {
  const matrix = createEmpty()
  const backArr = []
  let i = -1; let j = -1; let k = 0
  while (++i < 9) {
    while (++j < 9) {
      const ableArr = getAvailable(matrix, i, j)
      if (ableArr.length > 0) {
        const r = Math.floor(Math.random() * ableArr.length)
        matrix[i][j] = ableArr.splice(ableArr.indexOf(r), 1)[0]
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

testPure(algorithm_v4, 10000)
