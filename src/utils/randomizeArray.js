module.exports = {
  shuffleFisher,
  shuffleDraw,
  shuffleSwitch,
  randomArr,
  randomHash
}

// 1 抽取存储法
function shuffleDraw (arr) {
  const newArr = []
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * (arr.length - 1))
    newArr.push(arr[index])
    arr[index] = arr[arr.length - 1]
    arr.pop()
  }
  return (newArr)
}

// 2 两边对调法
function shuffleSwitch (arr) {
  let i
  const half = Math.ceil(arr.length / 2)
  for (i = 0; i < arr.length; i++) {
    const randLeft = Math.floor(Math.random() * half)
    const randRight = Math.floor(Math.random() * (half - 1)) + half
    const temp = arr[randLeft]
    arr[randLeft] = arr[randRight]
    arr[randRight] = temp
  }
  return arr
}

/**
 * 把数组洗牌
 * @param {*} arr
 * @returns
 */
function shuffleFisher (arr) {
  let i = arr.length
  while (i > 0) {
    const r = Math.floor(Math.random() * i--);
    [arr[i], arr[r]] = [arr[r], arr[i]]
  }
  return arr
}

// 4 数组法
function randomArr (a, b) {
  const outArr = []
  while (outArr.length < b - a + 1) {
    const rand = Math.floor(Math.random() * (b - a + 1) + a)
    if (outArr.indexOf(rand) === -1) {
      outArr.push(rand)
    }
  }
  return outArr
}

// 5 哈希法
function randomHash (a, b) {
  let i; const outArr = []; const hash = {}
  for (i = 0; i < b - a + 1; i++) {
    let rand = Math.floor(Math.random() * (b - a + 1) + a)
    while (hash[rand]) {
      rand = Math.floor(Math.random() * (b - a + 1) + a)
    }
    hash[rand] = 1
    outArr.push(rand)
  }
  return outArr
}
