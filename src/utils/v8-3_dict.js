const { isFilled, checkBoard } = require('./utils')

// bit dict 1075

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
        backArr[k] = []
        for (let p = 0; p < 9; p++) {
          if (!(combined & (1 << p))) { backArr[k].push(p+1) }
        }

        let r = (Math.random() * backArr[k].length) << 0
        let a = backArr[k][r]
        backArr[k][r] = backArr[k][backArr[k].length-1]
        backArr[k].pop()
        matrix[i][j] = a--

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
        } while (backArr[k].length === 0)

        let c = backArr[k].pop()
        matrix[i][j] = c--

        rows[i] += bitDict[c]
        cols[j] += bitDict[c]
        sqrs[dict[k]] += bitDict[c]
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

