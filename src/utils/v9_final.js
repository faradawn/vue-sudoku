const { createEmpty, createGlobal, shuffleFisher, isFilled, checkBoard, testPure } = require('./utils')

/*
  v9 bits 一万次: 
    global对象`` 1000ms
    拆成数组+dict 250ms 
    省略 let arr 236ms
    完全改backArr为二进制 178ms
*/


function algorithm_v8 () {
  const matrix = createEmpty()
  const backArr = []
  const rows = [], cols = [], sqrs = []
  const dict = [0,0,0,1,1,1,2,2,2, 0,0,0,1,1,1,2,2,2, 0,0,0,1,1,1,2,2,2,
  3,3,3,4,4,4,5,5,5, 3,3,3,4,4,4,5,5,5, 3,3,3,4,4,4,5,5,5,
  6,6,6,7,7,7,8,8,8, 6,6,6,7,7,7,8,8,8, 6,6,6,7,7,7,8,8,8,]

  let i = -1; let j = -1; let k = 0

  while (++i < 9) {
    while (++j < 9) {
      let combined = rows[i] | cols[j] | sqrs[dict[k]]      
      if(combined !== 511){
        let positions = [] // 从二进制数，随机取一个0位的位置，必须先化成数组？
        for (let p = 0; p < 9; p++) {
          if (!(combined & (1 << p))) { positions.push(p) }
        }
        let a = positions[Math.floor(Math.random() * positions.length)]
        matrix[i][j] = a + 1
        backArr[k] = combined | (1 << a)
        rows[i] |= 1 << a
        cols[j] |= 1 << a
        sqrs[dict[k]] |= 1 << a
        k++
      } else {
        do {
          k-- 
          if (j === 0) { j = 8; i--; } else { j--; }
          let b = matrix[i][j] - 1
          rows[i] &= ~(1 << b) 
          cols[j] &= ~(1 << b)
          sqrs[dict[k]] &= ~(1 << b)
        } while (backArr[k] === 511 || undefined)
        
        let p = 0
        for (; p < 9; p++) {
          if (!(backArr[k] & (1 << p))) { break }
        }
        matrix[i][j] = p + 1
        rows[i] |= 1 << p
        cols[j] |= 1 << p
        sqrs[dict[k]] |= 1 << p
        backArr[k] |= 1 << p
        k++
      }
    }
    j = -1
  }
  if (!isFilled(matrix) || !checkBoard(matrix)) {
    console.log('error', matrix)
  }
  return matrix
}


testPure(algorithm_v8, 10000)
