### 1 - 生成棋盘
- [] 回溯法，ableArr 树状结构
- [] 用一维数组

### 2 - 棋盘挖空
- [] pickArr 用两位数取代对象
- [] 若数独单一解，可以存上挖掉的数值和位置, 假设多解，只存位置，然后一次次判别

### 3 - 检查棋盘
- [] 显示答案


### 问题
- [] 把地址赋回去，为什么不行？
- [] a.slice() ？

function modifyArr(a){
  var copy_arr = JSON.parse(JSON.stringify(a)); // a.slice() 可以么？
  a[0] = 10;
  a = copy_arr; // 为什么不行？
}

var test_arr = [1,2,3];
modifyArr(test_arr);
console.log(test_arr);
