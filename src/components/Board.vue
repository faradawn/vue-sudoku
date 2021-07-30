<template>
    <h2>数独棋盘</h2>
    <div class="button-line">
      <button class="button" @click="createLevel(10)">简单</button>
      <button class="button" @click="createLevel(20)">普通</button>
      <button class="button" @click="createLevel(30)">困难</button>
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
const {createEmpty, createBoard} = require('../utils/createBoard');

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
      this.matrix = createEmpty();

    },
    createLevel(num){
      this.matrix = createBoard(num);

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
