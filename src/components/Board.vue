<template>
  <div class="main">
    <h2>小数独：五种棋盘生成算法</h2>
    <h3>生成棋盘</h3>
    <div class="button-line">
      <button class="button" @click="createLevel(20)">简单</button>
      <button class="button" @click="createLevel(30)">普通</button>
      <button class="button" @click="createLevel(40)">困难</button>
      <button class="button" @click="emptyBoard">清空</button>
    </div>

    <div>
      <h3>算法测速</h3>
      <div class="row">
        <input class="inputTimes" type="number" placeholder="请输入执行次数" v-model="times">
        <pre> {{message}}</pre>
      </div>

      <div class="button-line">
        <button class="button" @click="testGenerate(1)" >v1：随机法</button>
        <pre v-if="runtime[0] != -1">用时: {{runtime[0]}}ms</pre>
      </div>
      <div class="button-line">
        <button class="button" @click="testGenerate(2)" >v2：平移法</button>
        <pre v-if="runtime[1] != -1">用时: {{runtime[1]}}ms</pre>
      </div>
      <div class="button-line">
        <button class="button" @click="testGenerate(3)" >v3：三宫法</button>
        <pre v-if="runtime[2] != -1">用时: {{runtime[2]}}ms</pre>
      </div>
      <div class="button-line">
        <button class="button" @click="testGenerate(4)" >v4：逐行法</button>
        <pre v-if="runtime[3] != -1">用时: {{runtime[3]}}ms</pre>
      </div>
      <div class="button-line">
        <button class="button" @click="testGenerate(5)" >v5：位算法</button>
        <pre v-if="runtime[4] != -1">用时: {{runtime[4]}}ms</pre>
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
const { createBoard_v1 } = require('../utils/createBoard_v1')
const { createBoard_v2 } = require('../utils/createBoard_v2')
const { createBoard_v3 } = require('../utils/createBoard_v3')
const { createBoard_v4 } = require('../utils/createBoard_v4')
const { createBoard_v5 } = require('../utils/createBoard_v5')
const { createWithHoles } = require('../utils/createWithHoles')
const { createEmpty, testTime } = require('../utils/utils')

export default {
  data () {
    return {
      matrix: [[]],
      inputArr: [],
      runtime: [-1, -1, -1, -1, -1],
      times: null,
      message: ''
    }
  },
  mounted () {
    this.emptyBoard()
  },
  methods: {
    emptyBoard () {
      this.matrix = createEmpty()
      this.inputArr = []
      this.times = null
      this.runtime = [-1, -1, -1, -1, -1]
    },
    createLevel (num) {
      this.inputArr = []
      this.matrix = createWithHoles(num)
    },
    testGenerate (version) {
      let times = 1
      if (this.times) { times = this.times }
      switch (version) {
        case 1:
          if (times > 20) {
            alert('v1 执行次数超过20次，若时间过长可刷新页面')
          }
          this.runtime[0] = testTime(createBoard_v1, times)
          this.matrix = createBoard_v1().matrix
          break
        case 2:
          this.runtime[1] = testTime(createBoard_v2, times)
          this.matrix = createBoard_v2().matrix
          break
        case 3:
          if (times > 500) {
            alert('v3 执行次数超过500次，若时间过长可刷新页面')
          }
          this.runtime[2] = testTime(createBoard_v3, times)
          this.matrix = createBoard_v3().matrix
          break
        case 4:
          this.runtime[3] = testTime(createBoard_v4, times)
          this.matrix = createBoard_v4().matrix
          break
        case 5:
          this.runtime[4] = testTime(createBoard_v5, times)
          this.matrix = createBoard_v5().matrix
          break
        default:
      }
    },
    addInput (e) {
      console.log(e.target.value)
      const val = parseInt(e.target.value)
      const x = parseInt(e.target.id.substring(0, 1))
      const y = parseInt(e.target.id.substring(1, 2))
      if (val > 0 < 10) {
        this.inputArr.push({
          x: x,
          y: y,
          val: val
        })
      } else {
        console.log('请输入1-9的数字', val)
      }
    }
  }
}
</script>

<style scoped>
h2{
  margin-bottom: 0px;
}
h3{
  margin: 0;
  margin-top: 15px;
  margin-bottom: 10px;
}
pre{
  margin: 0
}
.row{
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 5px

}
.main{
  padding: 0 20px;
}
.inputTimes{
  margin-bottom: 15px;
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
