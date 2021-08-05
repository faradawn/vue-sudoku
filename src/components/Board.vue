<template>
  <div class="main">

    <h2>数独棋盘</h2>
    <!-- <div class="button-line">
      <button class="button" @click="createLevel(10)">简单</button>
      <button class="button" @click="createLevel(20)">普通</button>
      <button class="button" @click="createLevel(30)">困难</button>
    </div> -->
    <div class="button-line">
      <button class="button" @click="testGenerate(1, 20)" >v1生成测速</button>
      <pre v-if="runtime[0] != 0">用时: {{runtime[0]}}ms</pre>
    </div>
    <div class="button-line">
      <button class="button" @click="testGenerate(2, 100)" >v2生成测速</button>
      <pre v-if="runtime[1] != 0">用时: {{runtime[1]}}ms</pre>
    </div>
    <div class="button-line">
      <button class="button" @click="testGenerate(3, 100)" >v3生成测速</button>
      <pre v-if="runtime[2] != 0">用时: {{runtime[2]}}ms</pre>
    </div>
    <div class="button-line">
      <button class="button" @click="testGenerate(4, 100)" >v4生成测速</button>
      <pre v-if="runtime[3] != 0">用时: {{runtime[3]}}ms</pre>
    </div>

    <div class="board-container">
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
    </div>


  </div>  
</template>

<script>
const {createBoard_v1} = require('../utils/createBoard_v1');
const {createBoard_v2} = require('../utils/createBoard_v2');
const {createBoard_v3} = require('../utils/createBoard_v3');
const {createBoard_v4} = require('../utils/createBoard_v4');
const {createEmpty, testTime} = require('../utils/utils')

export default {
  data(){
    return{
      matrix: [[]],
      inputArr: [],
      loading: false,
      runtime: [0,0,0,0],

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
      this.matrix = createBoard_v1(num).matrix;
    },
    testGenerate(version, times){
      console.log(`v${version}开始执行${times}次`);
      var runtime;
      if(version === 1){
        runtime = testTime(createBoard_v1, 50, times);
        this.runtime[0] = runtime;
      } else if(version === 2){
        runtime = testTime(createBoard_v2, 50, times);
        this.runtime[1] = runtime;
      } else if(version === 3){
        runtime = testTime(createBoard_v3, 50, times);
        this.runtime[2] = runtime;
      } else if(version === 4){
        runtime = testTime(createBoard_v4, 50, times);
        this.runtime[3] = runtime;
      }
      this.createLevel(20);
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
.main{
  padding: 0 20px;
}
.inputBox {
  width: 1rem;
  height: 1rem;
  text-align: center;
}
.button-line{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
}
.button{
  margin-right: 10px;
  height: 30px;
}
.board-container{
  margin: 20px 0;
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
