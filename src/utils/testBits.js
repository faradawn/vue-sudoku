const global = {
  row1: null,
  col5: null,
  sqr01: null
}

global['row1'] = 0b11000
global['col5'] = 0b00100
global['sqr01'] = 0b00110
console.log('global', global)

function setRowColSqr (i, j, global, a){
  global[`row${i}`] = global[`row${i}`] | (1 << a)
  global[`col${j}`] = global[`col${j}`] | (1 << a)
  global[`sqr${(i/3)<<0}${(j/3)<<0}`] = global[`sqr${(i/3)<<0}${(j/3)<<0}`] | (1 << a)
}

function pickAndPush (i, j, global, backArr) {
  let row = global[`row${i}`]
  let col = global[`col${j}`]
  let sqr = global[`sqr${(i/3)<<0}${(j/3)<<0}`]
  let combined = global[`row${i}`] | global[`col${j}`] | global[`sqr${(i/3)<<0}${(j/3)<<0}`]
  if(combined === 511) {
    return -1
  } else {
    const arr = []
    for (let p = 0; p < 9; p++) {
      if (!(combined & (1 << p))) { arr.push(p+1) } // 0-based
    }
    const a = arr.splice(Math.floor(Math.random() * arr.length), 1)[0] - 1
    backArr.push(arr);
    setRowColSqr(i, j, global, a)
    return a + 1
  }
}

let backArr = []
console.log('returned a', pickAndPush(1, 5, global, backArr), global, backArr)
