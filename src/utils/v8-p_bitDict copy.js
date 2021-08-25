const { createEmpty, createGlobal, shuffleFisher, isFilled, checkBoard, testPure } = require('./utils')

// v8 bits 一万次: global对象`` 1000ms  -> 数组+sqrDict 250ms -> 去掉arr 236ms
// 改写 splice 180ms -> 第二次添加随机 184ms
// 现在 180
// 第一行 173
// sum 520

function algorithm_v8 () {
  const matrix = createEmpty()  
  const backArr = []
  const rows = [], cols = [], sqrs = [0,0,0,0,0,0,0,0,0]
  const sqrDict = [0,0,0,1,1,1,2,2,2, 0,0,0,1,1,1,2,2,2,
  3,3,3,4,4,4,5,5,5, 3,3,3,4,4,4,5,5,5, 3,3,3,4,4,4,5,5,5,
  6,6,6,7,7,7,8,8,8, 6,6,6,7,7,7,8,8,8, 6,6,6,7,7,7,8,8,8,]
  const bitDict = [1,2,4,8,16,32,64,128,256]
  matrix[0] = shuffleFisher([1,2,3,4,5,6,7,8,9])

  rows[0] = 511
  for(let q = 0; q < 9; q++){
    cols[q] = bitDict[matrix[0][q]-1]
    sqrs[sqrDict[q]] += bitDict[matrix[0][q]-1]
  }

  let i = 0; let j = -1; let k = 0

  while (++i < 9) {
    while (++j < 9) {
      let combined = rows[i] | cols[j] | sqrs[sqrDict[k]]      
      if(combined !== 511){
        backArr[k] = []
        for (let p = 0; p < 9; p++) {
          if (!(combined & (1 << p))) { backArr[k].push(p+1) }
        }

        let l = backArr[k].length
        let r = (Math.random() * l) << 0
        let a = backArr[k][r]
        backArr[k][r] = backArr[k][l-1]
        backArr[k].pop()
        matrix[i][j] = a--

        rows[i] += bitDict[a]
        cols[j] += bitDict[a]
        sqrs[sqrDict[k]] += bitDict[a] 
        k++

      } else {
        do {
          k-- 
          if (j === 0) { j = 8; i--; } else { j--; }
          let b = matrix[i][j] - 1
          rows[i] -= bitDict[b] 
          cols[j] -= bitDict[b]
          sqrs[sqrDict[k]] -= bitDict[b]
          matrix[i][j] = ''
        } while (backArr[k].length === 0)


        // 第二处
        let c = backArr[k].pop()
        matrix[i][j] = c--
        
        rows[i] += bitDict[c]
        cols[j] += bitDict[c]
        sqrs[sqrDict[k]] += bitDict[c]
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


// algorithm_v8()
testPure(algorithm_v8, 10000)
