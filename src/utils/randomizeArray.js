module.exports = {
  shuffleFisher,
}

// 1 抽取存储法
function shuffleDraw(arr){
  let newArr = [];
  let len = arr.length;
  for(let i = 0; i < len; i++){
    let index = Math.floor(Math.random()*(arr.length-1));
    newArr.push(arr[index]);
    arr[index] = arr[arr.length-1];
    arr.pop();
  }
  return(newArr);
}

// 2 两边对调法
function shuffleSwitch(arr){
  let i;
  let half = Math.ceil(arr.length/2);
  for(i = 0; i < arr.length; i++){
    let randLeft = Math.floor(Math.random()*half);
    let randRight = Math.floor(Math.random()*(half-1))+half;
    let temp = arr[randLeft];
    arr[randLeft] = arr[randRight];
    arr[randRight] = temp;
  }
  return arr;
}

/**
 * 把数组洗牌
 * @param {*} arr 
 * @returns 
 */
function shuffleFisher(arr){
  let i = arr.length;
  while(i > 0){
    let r = Math.floor(Math.random() * i--);
    [arr[i], arr[r]] = [arr[r], arr[i]];
  }
  return arr;
}

// 4 数组法
function randomArr(a, b){
  let outArr = [];
  while(outArr.length < b-a+1){
    let rand = Math.floor(Math.random()*(b-a+1) + a);
    if(outArr.indexOf(rand) === -1){
      outArr.push(rand);
    }
  }
  return outArr;
}

// 5 哈希法
function randomHash(a, b){
  let i, outArr = [], hash = {};
  for(i = 0; i < b-a+1; i++){
    let rand = Math.floor(Math.random()*(b-a+1) + a);
    while(hash[rand]){
      rand = Math.floor(Math.random()*(b-a+1) + a);
    }
    hash[rand] = 1;
    outArr.push(rand);
  }
  return outArr;
}


function arrGen(b){
  let i, arr = [];
  for(i = 1; i <= b; i++){
    arr.push(i);
  }
  return arr;
}

/**
 * 生成随机的九个数数组
 * @returns {[number]} 数组
 */
function generateNine(){
  return shuffleFisher(arrGen(9));
}


// ===== 执行部分 ======





// ===== 笔记 =====
/*
  100000000 (一亿) (2.37s)
    shuffleFisher 洗牌法 10.51s，（把len存起来 10.87s)
    shuffleDraw 抽签法 13.11s
    shuffleSwitch 交换法 13.27s，（存起来 14.07s）
    randomHash 哈希法 (heap out of memory) 43s
    randomArr 数组法 (跑不出来) 70s
  10000 (一万) (0.06s)
    shuffleDraw 抽签法 0.057s
    shuffleSwitch 交换法 0.065s
    shuffleFisher 洗牌法 0.064s
    randomArr 数组法: (find 1.10s，indexOf 0.95s, while 0.651)
    hashArr 哈希法 0.066s
*/