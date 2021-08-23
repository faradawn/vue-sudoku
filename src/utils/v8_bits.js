const { createEmpty, createGlobal, shuffleFisher, isFilled, checkBoard, testPure } = require('./utils')

// v8 bits: 一万次

function setRowColSqr (i, j, global, a){
  global[`row${i}`] = global[`row${i}`] | (1 << a)
  global[`col${j}`] = global[`col${j}`] | (1 << a)
  global[`sqr${(i/3)<<0}${(j/3)<<0}`] = global[`sqr${(i/3)<<0}${(j/3)<<0}`] | (1 << a)
}

function pickAndPush (i, j, global, backArr) {
  let combined = global[`row${i}`] | global[`col${j}`] | global[`sqr${(i/3)<<0}${(j/3)<<0}`]
  if(combined === 511) {
    return -1
  } else {
    const arr = []
    for (let p = 0; p < 9; p++) {
      if (!(combined & (1 << p))) { arr.push(p+1) } // 0-based
    }
    const a = arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
    backArr.push(arr);
    setRowColSqr(i, j, global, a-1)
    return a 
  }
}

function algorithm_v8 () {
  const matrix = createEmpty()
  const global = createGlobal()
  const backArr = []
  let i = -1; let j = -1; let k = 0
  while (++i < 9) {
    while (++j < 9) {
      const a = pickAndPush(i, j, global, backArr)
      if (a !== -1) {
        matrix[i][j] = a;
        console.log('fill', a, backArr[k])
        k++
      } else {
        do {
          console.log('start backtrace')
          if (j === 0) { j = 8; i-- } else { j-- }
          k--
          let b = matrix[i][j] - 1
          global[`row${i}`] = global[`row${i}`] & (0 << b)
          global[`col${j}`] = global[`col${j}`] & (0 << b)
          global[`sqr${(i/3)<<0}${(j/3)<<0}`] = global[`sqr${(i/3)<<0}${(j/3)<<0}`] & (0 << b)
          matrix[i][j] = ''
        } while (backArr[k].length === 0)

        let c = backArr[k].pop() - 1
        matrix[i][j] = c + 1
        global[`row${i}`] = global[`row${i}`] | (1 << c)
        global[`col${j}`] = global[`col${j}`] | (1 << c)
        global[`sqr${(i/3)<<0}${(j/3)<<0}`] = global[`sqr${(i/3)<<0}${(j/3)<<0}`] | (1 << c)
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

algorithm_v8()

// testPure(algorithm_v8, 10000)
