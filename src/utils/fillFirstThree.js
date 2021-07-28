import { generateNine } from './randomArr.js';

/**
 * 生成对角线三个九宫格
 * @param {[[]]} matrix 
 * @returns {array}
 */
export function fillFirstThree(matrix){
  let iter = -1, k = 0;
  while(++iter < 3){
    var nineArray = generateNine();
    for(let i = iter*3; i < iter*3+3; i++){
      for(let j = iter*3; j < iter*3+3; j++){
        matrix[i][j] = nineArray[k];
        k++;
      }
    }
    k = 0;
  }
  return matrix;
}
