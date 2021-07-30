
function modifyArr(a){
  var copy_arr = JSON.parse(JSON.stringify(a)); // a.slice() 可以么？
  a[0] = 10;
  a = copy_arr; // 为什么不行？
}

var test_arr = [1,2,3];
modifyArr(test_arr);
console.log(test_arr);