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
          <div v-if="cell">
            {{cell}}
          </div>
          <div v-else>
            <input :id="rowIndex+''+cellIndex" class="inputBox" @keyup="addInput">
          </div>
      </div>
    </div>
    <div>
      <pre>inputArr: {{inputArr}}</pre>
    </div>
    
    
    
</template>

<script>
const {createEmpty, createBoard, testTime} = require('../utils/createBoard');

export default {
  data(){
    return{
      matrix: [[]],
      inputArr: [],

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
      this.inputArr = [];
      this.matrix = createBoard(num).matrix;
      let times = 50;
      console.log(num/10,`开始执行${times}次`);
      let start = new Date().getTime();
      console.log(num/10,'平均运行时间', testTime(num, times), 'ms');
      let end = new Date().getTime();
      console.log('总用时',end-start);

    },
    addInput(e){
      console.log(e.target.value)
      let val = parseInt(e.target.value);
      let x = parseInt(e.target.id.substring(0,1));
      let y = parseInt(e.target.id.substring(1,2));
      if(0 < val < 10){
        this.inputArr.push({
          x: e.target.id.substring(0,1),
          y: e.target.id.substring(1,2),
          val: val
        })
      } else{
        console.log('请输入1-9的数字', val);
      }
    }

  },
  
}
</script>

<style scoped>
.inputBox {
  width: 1rem;
  height: 1rem;
}
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
