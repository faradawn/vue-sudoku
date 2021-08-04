const { createEmpty, fillFirstThree, createHoles, shuffleFisher, getAvailable } = require('./utils');

createBackTrace();

function createBackTrace(){
  var matrix = fillFirstThree(createEmpty()); 
  var backArr = [];
  let i = -1; j = -1; k = 0;
  while(++i<9){
    innerloop:
    while(++j<9){
      // 跳过生成好的三宫格
      switch(Math.floor(i/3)){
        case 0:
          if(j<=2) {j=3}
          break;
        case 1:
          if(j>=3&&j<=5) {j=6}
          break;
        default:
          if(j>=6) {j=-1; break innerloop}
      }
      console.log('检查', i, j, 'k',k);
      // 来到新格子，获取ableArr，并填数
      if(!matrix[i][j]){
        let ableArr = getAvailable(matrix, i, j);
        // 如果有可用数组，填入末尾的数字
        if(ableArr.length > 0){ 
          matrix[i][j] = ableArr.pop();
          backArr[k] = ableArr;
          k++;
          console.log('填入')
        // 如果没有可用数组，回到上一格
        } else {
          console.log('开始回溯',i,j, 'k',k,backArr)
          k --;
          while(backArr[k].length === 0){ // 可能--k
            
            k --;
            switch(Math.floor(i/3)){
              case 0:
                if(j<=3) {j=7; i--}
                else {j--}
                break;
              case 1:
                if(j===6) {j=2}
                else if(j<=0) {j=7; i--}
                else {j--}
                break;
              default:
                if(j<=0) {j=7; i--}
                else {j--}
            }
            matrix[i][j] = '';
          }
          switch(Math.floor(i/3)){
            case 1:
              if(j===6) {j=2}
              else if(j<=0) {j=7; i--}
              else {j--}
              break;
            default:
              if(j<=3) {j=7; i--}
              else {j--}
          }
          matrix[i][j] = backArr[k].pop();
          console.log('回溯完成',i,j,'k',k, backArr);
          k++;




        }
      }else{
        console.log('不是空格子',i,j,'k',k)
      }
    }
    if(j>=8){
      j = -1;
    }
  }
  console.log('output', matrix);

}