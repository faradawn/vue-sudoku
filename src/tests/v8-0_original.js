const { isFilled, checkBoard } = require('./utils')
// v8 bits 一万次: global对象`` 1000ms  -> 数组+dict 250ms -> 去掉arr 236ms
// 改写 splice 180ms -> 第二次添加随机 184ms
// 1213
// 1182 -> 1130, 50ms 两处arrlen，独自快

function algorithm_v8 () {
  const matrix = [[],[],[],[],[],[],[],[],[]]
  const backArr = []
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

        let r = (Math.random() * backArr[k].length) << 0
        let a = backArr[k][r]
        backArr[k][r] = backArr[k][backArr[k].length-1]
        backArr[k].pop()
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
        } while (backArr[k].length === 0)

        let c = backArr[k].pop()
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
