const { createEmpty, shuffleFisher, isFilled, checkBoard, testPure } = require('./utils')

// v5 indexOf: 一万次 0.933s

function getAvailable_indexOf (matrix, i, j) {
  const ableArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (let a = 0; a < j; a++) {
    const p = ableArr.indexOf(matrix[i][a])
    ableArr.splice(p, 1)
  }
  for (let b = 0; b < i; b++) {
    const p = ableArr.indexOf(matrix[b][j])
    if (p !== -1) {
      ableArr.splice(p, 1)
    }
  }
  if (ableArr.length === 0) {
    return []
  }
  for (let x = Math.floor(i / 3) * 3; x < i; x++) {
    for (let y = Math.floor(j / 3) * 3; y < Math.floor(j / 3) * 3 + 3; y++) {
      const p = ableArr.indexOf(matrix[x][y])
      if (p !== -1) {
        ableArr.splice(p, 1)
      }
    }
  }
  return ableArr
}

function algorithm_v5 () {
  const matrix = createEmpty()
  const backArr = []
  let i = -1; let j = -1; let k = 0
  while (++i < 9) {
    while (++j < 9) {
      const ableArr = shuffleFisher(getAvailable_indexOf(matrix, i, j))
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
  // if (!isFilled(matrix) || !checkBoard(matrix)) {
  //   console.log('error')
  // }
  return matrix
}

testPure(algorithm_v5, 10000)
