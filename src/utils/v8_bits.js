const { createEmpty, createGlobal, shuffleFisher, isFilled, checkBoard, testPure } = require('./utils')

// v8 bits: 一万次 1.0s

function setBits (i, j, global, a, action){
  a --
  if(action === 'add'){ // set 1
    global[`row${i}`] |= 1 << a
    global[`col${j}`] |= 1 << a
    global[`sqr${(i/3)<<0}${(j/3)<<0}`] |= 1 << a
  } else { // set 0
    global[`row${i}`] &= ~(1 << a)
    global[`col${j}`] &= ~(1 << a)
    global[`sqr${(i/3)<<0}${(j/3)<<0}`] &= ~(1 << a)
  }
}

function pickAndPush (i, j, k, global, backArr) {
  let combined = global[`row${i}`] | global[`col${j}`] | global[`sqr${(i/3)<<0}${(j/3)<<0}`]
  if(combined === 511) {
    return -1
  } else {
    const arr = []
    for (let p = 0; p < 9; p++) {
      if (!(combined & (1 << p))) { arr.push(p+1) }
    }
    const a = arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
    backArr[k] = arr
    setBits(i, j, global, a, 'add')
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
      const a = pickAndPush(i, j, k, global, backArr)
      if (a !== -1) {
        matrix[i][j] = a
        k++
      } else {
        do {
          if (j === 0) { j = 8; i--; } else { j--; }
          k-- 
          const b = matrix[i][j]
          setBits(i, j, global, b, 'remove')
          matrix[i][j] = ''
        } while (backArr[k].length === 0)

        let c = backArr[k].pop()
        matrix[i][j] = c
        setBits(i, j, global, c, 'add')
        k++

      }
    }
    j = -1
  }
  // if (!isFilled(matrix) || !checkBoard(matrix)) {
  //   console.log('error', matrix)
  // }
  return matrix
}


testPure(algorithm_v8, 10000)
