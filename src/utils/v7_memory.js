const { createEmpty, shuffleFisher, isFilled, checkBoard, testPure } = require('./utils')

// v7 memory: 0.200 一次

function getAvailable_memory (matrix, rowRemain, i, j) {
  const ableArr = JSON.parse(JSON.stringify(rowRemain))
  for (let b = 0; b < i; b++) {
    const num = matrix[b][j]
    if (ableArr[num]) {
      delete ableArr[num]
    }
  }
  for (let x = Math.floor(i / 3) * 3; x < i; x++) {
    for (let y = Math.floor(j / 3) * 3; y < Math.floor(j / 3) * 3 + 3; y++) {
      const num = matrix[x][y]
      if (ableArr[num]) {
        delete ableArr[num]
      }
    }
  }
  return ableArr
}

function pickAndDelete (ableArr, rowRemain) {
  const keys = Object.keys(ableArr)
  const a = keys[keys.length * Math.random() << 0]
  const val = ableArr[a]
  delete ableArr[a]
  if (rowRemain) { delete rowRemain[a] }
  return val
}

function algorithm_v7 () {
  const matrix = createEmpty()
  const backArr = []
  let i = -1; let j = -1; let k = 0
  while (++i < 9) {
    let rowRemain = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9 }
    while (++j < 9) {
      const ableArr = getAvailable_memory(matrix, rowRemain, i, j)
      if (Object.keys(ableArr).length !== 0) {
        matrix[i][j] = pickAndDelete(ableArr, rowRemain)
        backArr[k] = ableArr
        k++
      } else {
        const m = i
        do {
          if (j === 0) { j = 8; i-- } else { j-- }
          k--
          matrix[i][j] = ''
        } while (Object.keys(backArr[k]).length === 0)
        matrix[i][j] = pickAndDelete(backArr[k])
        k++
        if (i < m) {
          rowRemain = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9 }
          for (let p = 0; p < j; p++) {
            delete rowRemain[matrix[i][p]]
          }
        }
      }
    }
    j = -1
  }

  if (!isFilled(matrix) && checkBoard(matrix)) {
    console.log('error')
  }
  return matrix
}

algorithm_v7()
