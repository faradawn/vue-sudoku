const global = {
  row1: 0b11000,
  col5: 0b00100,
  sqr01: 0b00110
}

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
    let a = arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
    a = 1
    backArr.push(arr);
    return a
  }
}




function showBits(x){
  let arr = []
  for(let i = 8; i >= 0; i--){
    arr[i] = x & 1
    x = x >> 1
  }
  return arr
}
