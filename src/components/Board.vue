<template>
  <div class="main">
    <h2>小数独：四种棋盘生成算法</h2>
    <p>生成棋盘</p>
    <div class="button-line">
      <button class="button" @click="createLevel(20)">简单</button>
      <button class="button" @click="createLevel(30)">普通</button>
      <button class="button" @click="createLevel(40)">困难</button>
      <button class="button" @click="emptyBoard">清空</button>
    </div>

    <div>
      <p>算法测速</p>
      <div class="button-line">
        <button class="button" @click="testGenerate(1, 5)" >v1：随机法</button>
        <pre v-if="runtime[0] != 0">用时: {{runtime[0]}}s</pre>
      </div>
      <div class="button-line">
        <button class="button" @click="testGenerate(2, 50)" >v2：平移法</button>
        <pre v-if="runtime[1] != 0">用时: {{runtime[1]}}s</pre>
      </div>
      <div class="button-line">
        <button class="button" @click="testGenerate(3, 50)" >v3：三宫法</button>
        <pre v-if="runtime[2] != 0">用时: {{runtime[2]}}s</pre>
      </div>
      <div class="button-line">
        <button class="button" @click="testGenerate(4, 50)" >v4：逐行法</button>
        <pre v-if="runtime[3] != 0">用时: {{runtime[3]}}s</pre>
      </div>
      <div class="button-line">
        <button class="button" @click="testGenerate(5, 50)" >v5：最终优化</button>
        <pre v-if="runtime[4] != 0">用时: {{runtime[4]}}s</pre>
      </div>
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
const {createBoard_v5} = require('../utils/createBoard_v5');
const {createEmpty, testTime} = require('../utils/utils');

export default {
  data(){
    return{
      matrix: [[]],
      inputArr: [],
      runtime: [0,0,0,0,0]
    }
  },
  mounted(){
    this.emptyBoard();
  },
  methods: {
    emptyBoard(){
      this.matrix = createEmpty();
      this.inputArr = [];
      this.runtime = [0,0,0,0,0];
    },
    createLevel(num, version){
      this.inputArr = [];
      switch (version){
        case 1:
          this.matrix = createBoard_v1(num).matrix;
          break;
        case 3:
          this.matrix = createBoard_v3(num).matrix;
          break;
        case 4:
          this.matrix = createBoard_v4(num).matrix;
          break;
        case 5:
          this.matrix = createBoard_v5(num).matrix;
          break;
        default:
          this.matrix = createBoard_v2(num).matrix;
      }
    },
    testGenerate(version, times){
      console.log(version === 1 ? `v${version}开始执行${times*5}次`
      : `v${version}开始执行${times*10}次`);
      var runtime = 0;
      if(version === 1){
        for(let i=0; i<4; i++){
          runtime += testTime(createBoard_v1, 50, times);
        }
        this.runtime[0] = (runtime/5).toFixed(2);
      } else if(version === 2){
        for(let i=0; i<9; i++){
          runtime += testTime(createBoard_v2, 50, times);
        }
        this.runtime[1] = (runtime/10).toFixed(2);
      } else if(version === 3){
        for(let i=0; i<9; i++){
          runtime += testTime(createBoard_v3, 50, times);
        }
        this.runtime[2] = (runtime/10).toFixed(2);
      } else if(version === 4){
        for(let i=0; i<9; i++){
          runtime += testTime(createBoard_v4, 50, times);
        }
        this.runtime[3] = (runtime/10).toFixed(2);
      } else if(version === 5){
        for(let i=0; i<9; i++){
          runtime += testTime(createBoard_v5, 50, times);
        }
        this.runtime[4] = (runtime/10).toFixed(2);
      }
      this.createLevel(20, version);
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
