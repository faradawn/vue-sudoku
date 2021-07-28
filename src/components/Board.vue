<template>
    <h2>数独棋盘</h2>
    <div class="button-line">
      <button class="button" @click="createEasy">简单</button>
      <button class="button" @click="createEasy">普通</button>
      <button class="button" @click="createEasy">困难</button>
    </div>

    <div 
      class='line'
      v-for='(row, rowIndex) in matrix'
      :key='rowIndex*10'>
      
      <div
       class='cell'
        v-for='(cell, cellIndex) in row'
        :key='cellIndex'
        :style="cellIndex % 3 === 2 && cellIndex != 8 ?
          rowIndex % 3 === 2 && rowIndex != 8 ? 
          'border-bottom: 1px solid red; border-right: 1px solid red' :
          'border-right: 1px solid red' : rowIndex % 3 === 2 && rowIndex != 8?
          'border-bottom: 1px solid red;' : ''">
          {{cell}}
      </div>
    </div>
    
    
    
</template>

<script>
import { fillFirstThree } from '../utils/fillFirstThree.js';

export default {
  data(){
    return{
      myWidth: window.innerWidth,
      matrix: [[]],
    }
  },
  mounted(){
    this.emptyBoard();

  },
  methods: {
    emptyBoard(){
      var board = Array.from(Array(9), () => new Array(9));
      for(let i = 0; i<9; i++){
        for(let j = 0; j<9; j++){
          board[i][j] = '';
        }
      }
      this.matrix = board;
    },
    createEasy(){
      let matrix = fillFirstThree(this.matrix);

      this.matrix = matrix;
    },
    resize(){
      this.myWidth = window.innerWidth;
    }

  },
  
  created() {
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
}
</script>

<style scoped>
.button-line{
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
}
.button{
  margin-right: 10px;
}
.line {
  width: 18rem;
  display: flex;
  flex-direction: row;

}
.cell {
  width: 2rem;
  height: 2rem;
  background: ivory;
  border: 1px solid lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;

}

</style>
