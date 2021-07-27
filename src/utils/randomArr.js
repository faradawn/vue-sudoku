/**
 * 抽签法
 * @param {array} arr
 * @returns {array} 
 */
function shuffleDraw(arr){
  let newArr = [];
  let len = arr.length;
  let i;
  for(i = 0; i < len; i++){
    let index = Math.floor(Math.random()*(arr.length-1));
    newArr.push(arr[index]);
    arr[index] = arr[arr.length-1];
    arr.pop();
  }
  return(newArr);
}

/**
 * 交换法
 * @param {array} arr 
 * @returns {array}
 */
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
 * 数组法
 * @param {number} a Start index
 * @param {number} b End index
 * @returns {array}
 */
function randomArr(a, b){
  let outArr = [];
  let i;
  for(i = 0; i < b-a+1; i++){
    let rand = Math.floor(Math.random()*(b-a+1)+a);
    while(outArr.find((val) => val===rand)){
      rand = Math.floor(Math.random()*(b-a+1)+a);
    }
    outArr.push(rand);
  }
  return outArr;
}

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




// ===== 执行部分 ======
// console.log(shuffleDraw(arrGen(10000)));
randomArr(1,10000)




// ===== 笔记 =====
/*
  100000000 (一亿) (2.37s)
    shuffleDraw 抽签法 13.11s
    shuffleSwitch 交换法 13.27s，（把input array len存起来 14.07s）
    randomHash 哈希法 (heap out of memory) 43s
    randomArr 数组法 (跑不出来) 70s

  10000 (一万) (0.06s)
    shuffleDraw 抽签法 0.057s
    shuffleSwitch 交换法 0.065s
    randomArr 数组法: (find 1.10s，indexOf 0.95s)
    hashArr 哈希法 0.066s
*/