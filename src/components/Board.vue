<template>
    <h1>数独棋盘</h1>
    <button @click="createEasy">简单</button>

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

export default {
  data(){
    return{
      myWidth: window.innerWidth,
      matrix: [
        [,,,,,,,,,],
        [,,,,,,,,,],
        [,,,,,,,,,],
        [,,,,,,,,,],
        [,,,,,,,,,],
        [,,,,,,,,,],
        [,,,,,,,,,],
        [,,,,,,,,,],
        [,,,,,,,,,],
      ]
    }
  },
  methods: {
    emptyBoard(){
      var board = [[]];
      var i, j;
      for(i = 0; i<8; i++){
        for(j = 0; j<8; j++){
          board[i][j] = ' ';
        }
      }
      return board;
    },
    createEasy(){
      var board = Array.from(Array(9), () => new Array(9));
      var i, j;
      for(i = 0; i < 9; i++){
        for(j = 0; j < 9; j++){
          board[i][j] = 0;
        }
      }

      this.matrix = board;
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
