
const {isFilled, checkBoard } = require('./utils')

// v8 bits 一万次: global对象`` 1000ms  -> 数组+dict 250ms -> 去掉arr 236ms -> 取代splice 180ms
// 只有一次随机 180ms -> 第二次添加随机 184ms -> shuffle 235ms -> global l 186ms
function createEmpty () {
  return [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '']
  ]
}
function testPure (fn, times) {
  const start = new Date().getTime()
  for (let i = 0; i < times; i++) {
    fn()
  }
  const end = new Date().getTime()
  console.log('用时', end - start)
  return end - start
}

function algorithm_v8 () {
  const matrix = createEmpty()
  const backArr = []
  const backArrLen = []
  const rows = [], cols = [], sqrs = []
  const dict = [0,0,0,1,1,1,2,2,2, 0,0,0,1,1,1,2,2,2, 0,0,0,1,1,1,2,2,2, 3,3,3,4,4,4,5,5,5, 3,3,3,4,4,4,5,5,5, 3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8, 6,6,6,7,7,7,8,8,8, 6,6,6,7,7,7,8,8,8,]

  let i = -1; let j = -1; let k = 0

  while (++i < 9) {
    while (++j < 9) {
      let combined = rows[i] | cols[j] | sqrs[dict[k]]      
      if(combined !== 511){
        backArr[k] = []
        for (let p = 0; p < 9; p++) {
          if (!(combined & (1 << p))) { backArr[k].push(p+1) }
        }
        // 第一处
        let l = backArr[k].length
        let r = (Math.random() * l) << 0
        let a = backArr[k][r]
        backArr[k][r] = backArr[k][l-1]
        backArrLen[k] = l - 1
        

        matrix[i][j] = a--
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
          matrix[i][j] = ''
        } while (backArrLen[k] === 0)

        // 第二处
        // 之前 let c = backArr[k].pop()

        let r = (Math.random() * backArrLen[k]) << 0
        let c = backArr[k][r]
        backArr[k][r] = backArr[k][backArrLen[k]-1]
        backArrLen[k] --

        matrix[i][j] = c--
        rows[i] |= 1 << c
        cols[j] |= 1 << c
        sqrs[dict[k]] |= 1 << c
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
