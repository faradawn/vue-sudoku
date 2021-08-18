// 一万次 0.074，十万次0.274，百万次2.27
function deleteProperty (obj) {
  const keys = Object.keys(obj)
  delete obj[keys[keys.length * Math.random() << 0]]
}

// 一万次 0.128，十万次0.77，百万次7.27
function setEmpty (obj) {
  const o = Object.entries(obj).filter(v => v[1] !== '')
  const i = (Math.random() * o.length << 0)
  obj[o[i][1]] = ''
}

function test (fn, times) {
  for (let k = 0; k < times; k++) {
    const arr = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9 }
    for (let i = 0; i < 7; i++) {
      fn(arr)
    }
  }
}

const a = { '1': 1, '2': 2, '3': 3 }
console.log(delete a[3])
console.log(delete a[4], a)
