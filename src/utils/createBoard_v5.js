const { createEmpty, shuffleFisher } = require('./utils')
module.exports = {

}

function getAvailable_new (matrix, i, j) {
  const ableArr = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 6, '8': 8, '9': 9 }
  matrix[i].forEach(num => {
    if (ableArr[num]) {
      ableArr[num] = null
    }
  })
  for (let b = 0; b < i; b++) { // 列
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
  return Object.values(ableArr)
}
// v5 裸函数: 941 (array index of) -> 380 (obj null) -> 607 (delete property)
function algorithm_v5 () {
  const matrix = createEmpty()
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

function test () {
  const start = new Date().getTime()
  for (let i = 0; i < 10000; i++) {
    algorithm_v5()
  }
  const end = new Date().getTime()
  console.log('用时', end - start)
}

test()

const obj = { '1': null, '2': 2, '3': null, '4': 4 }
const a = Object.values(obj).filter(v => v)
console.log(a)
