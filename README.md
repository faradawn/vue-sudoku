# Js小数独：五种棋盘生成法
## Vue 版
<p float="left">
  <img src="/src/assets/screen-3.png" width="290" height="300" />
  <img src="/src/assets/screen-4.png" width="300" height="300"/> 
</p>

### 使用方法

- 安装包裹 `yarn install`  
- 启动 `yarn dev`   
- 在浏览器 `localhost:7000`  

## HTML 版  
<img src="/src/assets/screen-html.png" width="500" height="400"/> 

### 使用方法
- 双击打开 `final-sudoku.html` 即可

### 说明
- HTML版使用的是v5算法
- 5种算法纯代码，分别在 `./src/utils/createBoard_v1/2/3/4/5.js` 
- 查看所有阶段性的代码，可切换branch `test_generate_board`
- 在 `./src/tests/` 里包含 v1 - v9 的代码迭代过程

<br>

## 生成测速 ⏱️（生成+挖空）
- v1 随机法：140s (单次，chrome）
- v2 平移法：0.06s（单次，chrome）
- v3 三宫法：9.00s (单次，chrome）
- v4 逐行法：0.90s (单次，chrome）
- v5 位算法：0.027s (单次，chrome，不挖空）
  - 0.892s (八万次，node，不挖空）

## 算法讲述 🧮
### v1: 随机法
1. 建立空的棋盘，用二维数组
2. 生成1-9的数组，填入对角线三个宫格
3. 遍历剩下的格子，每次从行列宫中可用数字里，随机填一个
4. 若走到“死格”（无可用数字），则从第一个格，重新开始
5. 直到试出一种方法，把棋盘填满 （会重来几百到几千次不等）

### v2: 平移法
1. 生成第一行
2. 剩下的行，把第一行，依次向左平移[3,6,1,4,7,2,5,8]位
3. 即可得到，合法的棋盘

### v3: 三宫法
1. 生成对角的三个宫格
2. 遍历剩下的，每次从行列宫中，获取全部可用数字
3. 存储每格的“备用数字”
4. 若到“死格”则回溯，从上一格的“备用数字”中，换一个填入
5. 最终填完整个棋盘

### v4: 逐行法
1. 从第一格开始遍历，依次逐行
2. 存储每格的“备用数字”
3. 若到”死格“，则回到上一格，更换数字
4. 回溯时，清空路过的格子
5. 最终填完整个棋盘

### v5: 位算法 + 存储行列宫
1. 建立rows，cols，sqrs数组，存储该行/列/宫可用的数字
2. 用9位的二进制表示，0代表可用
3. 一格一格走，每次取交集，存入backArr
4.（注：第一行直接生成随机9个数）

## 经验记录 📝

### 优化记录一
- 创建空棋盘（提升1ms）
  - 用硬编码取代双循环遍历, 提升1ms
- 抽取可用数字（提升10ms）
  - 修正：不随机，每次取末尾，会导致第一行相同（错误）
  - 旧方法: 从数组随机抽取（0.900)
  - 新方法: 把数组整体打乱 (0.790) 
- 构造可用数组（提升40ms）
  - 旧方法: 分别获取行列宫，合并三数组，再用ableArr减去 （0.182)
  - 改进: 每次对比都削减ableArr（0.127)
- 回溯数组（尝试）
  - 法1: 直接修剪回溯数组，每次需 pop push length （时间复杂度高）
  - 法2: 用额外k指针，在回溯数组中移动 （v4 v5 都采取）
- 用set改写（尝试）
  - 反而降速，因基础数据结构最快
- 两次随机抽和一次随机+pop，相当

### 优化记录二
- 数组：是否存储下arr.length? 若只有两处则不值得
- 数组：是否建立临时变量？不值得，直接修改数组更快
- 数组：swap+pop 比 splice 快
- 字典：dict[0 0 0 1 1 1 ...] 比 (i % 3) << 0 快！
- 对象：修改数组比对象属性快
- 对象：设置null+filter成arr也比delete property快
- 位运算：shift + or 比 plus 快（？），加上字典更慢？
- 位运算：<< 比 Math.floor 快一些

## 最后 ☘️
制作时间四周，2021.7.19至2021.8.26；
在大鹏老师指导下完成！
- 第一周Webpack和v1算法
- 第二周v2 v3 v4
- 第三周优化v5
- 第四周v8位运算 

欢迎任何订正或建议，
祝度过愉快的一天！  


