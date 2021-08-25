const { createEmpty, shuffleFisher, isFilled, checkBoard, testPure } = require('./utils')

// v6 object: 一万次 shuffle 570ms -> splice 608ms
// 为什么splce慢？

function getAvailable_object (matrix, i, j) {
  const ableArr = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9 }
  for (let a = 0; a < j; a++) {
    const num = matrix[i][a]
    if (ableArr[num]) {
      ableArr[num] = null
    }
  }
  for (let b = 0; b < i; b++) {
    const num = matrix[b][j]
    if (ableArr[num]) {
      ableArr[num] = null
    }
  }
  for (let x = Math.floor(i / 3) * 3; x < i; x++) {
    for (let y = Math.floor(j / 3) * 3; y < Math.floor(j / 3) * 3 + 3; y++) {
      const num = matrix[x][y]
      if (ableArr[num]) {
        ableArr[num] = null
      }
    }
  }
  return Object.values(ableArr).filter(v => v)
}

function algorithm_v6 () {
  const matrix = createEmpty()
  const backArr = []
  let i = -1; let j = -1; let k = 0
  while (++i < 9) {
    while (++j < 9) {
      let ableArr = getAvailable_object(matrix, i, j)
      if (ableArr.length > 0) {
        ableArr = shuffleFisher(ableArr)
        matrix[i][j] = ableArr.pop()
        // matrix[i][j] = ableArr.splice(Math.floor(Math.random() * ableArr.length), 1)[0]
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
  // if (!isFilled(matrix) && checkBoard(matrix)) {
  //   console.log('error')
  // }
  return matrix
}

testPure(algorithm_v6, 10000)
