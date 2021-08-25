const { isFilled, checkBoard } = require('./utils')

/*
  v9 bits 一万次: 
    global对象`` 1000ms
    拆成数组+dict 250ms 
    省略 let arr 236ms
    完全改backArr为二进制 178ms
*/


function algorithm_v8 () {
  const matrix = [[],[],[],[],[],[],[],[],[]]
  const backArr = []
  const rows = [0,0,0,0,0,0,0,0,0], cols = [0,0,0,0,0,0,0,0,0], sqrs = [0,0,0,0,0,0,0,0,0]
  const dict = [0,0,0,1,1,1,2,2,2, 0,0,0,1,1,1,2,2,2, 0,0,0,1,1,1,2,2,2, 3,3,3,4,4,4,5,5,5, 3,3,3,4,4,4,5,5,5, 3,3,3,4,4,4,5,5,5, 6,6,6,7,7,7,8,8,8, 6,6,6,7,7,7,8,8,8, 6,6,6,7,7,7,8,8,8,]
  const bitDict = [1,2,4,8,16,32,64,128,256]

  let i = -1; let j = -1; let k = 0

  while (++i < 9) {
    while (++j < 9) {
      let combined = rows[i] | cols[j] | sqrs[dict[k]]      
      if(combined !== 511){
        let positions = []
        for (let p = 0; p < 9; p++) {
          if (!(combined & (1 << p))) { positions.push(p) }
        }

        let a = positions[(Math.random() * positions.length) << 0]
        backArr[k] = combined + bitDict[a]
        matrix[i][j] = a + 1

        rows[i] += bitDict[a]
        cols[j] += bitDict[a]
        sqrs[dict[k]] += bitDict[a]
        k++

      } else {
        do {
          k-- 
          if (j === 0) { j = 8; i--; } else { j--; }
          let b = matrix[i][j] - 1
          rows[i] -= bitDict[b] 
          cols[j] -= bitDict[b]
          sqrs[dict[k]] -= bitDict[b]
        } while (backArr[k] === 511 || undefined)
        
        let p = 0
        for (; p < 9; p++) {
          if (!(backArr[k] & (1 << p))) { break }
        }
        backArr[k] += bitDict[p]
        matrix[i][j] = p + 1
        
        rows[i] += bitDict[p]
        cols[j] += bitDict[p]
        sqrs[dict[k]] += bitDict[p]
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


testPure(algorithm_v8, 80000)

function testPure (fn, times) {
  const start = new Date().getTime()
  for (let i = 0; i < times; i++) {
    fn()
  }
  const end = new Date().getTime()
  console.log('用时', end - start)
  return end - start
}