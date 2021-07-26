function shuffle1(arr){
  let len = arr.length;
  let newArr = [];
  let i;
  for(i = 0; i < len; i++){
    let index = Math.floor(Math.random()*(arr.length-1));
    newArr.push(arr[index]);
    arr[index] = arr[arr.length-1];
    arr.pop();
  }
  console.log(newArr);
  return(newArr);

}

let arr1 = [1,2,3,4,5,6,7,8,9,];

