<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>v9数独游戏</title>

  <script type="text/javascript">

  function algorithm_v8 () {
    const matrix = [[],[],[],[],[],[],[],[],[]]
    const backArr = []
    const rows = [0,0,0,0,0,0,0,0,0], cols = [0,0,0,0,0,0,0,0,0], sqrs = [0,0,0,0,0,0,0,0,0]
    const dict = [0,0,0,1,1,1,2,2,2, 0,0,0,1,1,1,2,2,2, 0,0,0,1,1,1,2,2,2, 3,3,3,4,4,4,5,5,5, 3,3,3,4,4,4,5,5,5, 3,3,3,4,4,4,5,5,5, 6,6,6,7,7,7,8,8,8, 6,6,6,7,7,7,8,8,8, 6,6,6,7,7,7,8,8,8,]
    const bitDict = [1,2,4,8,16,32,64,128,256]

    let i = -1; let j = -1; let k = 0

    while (++i < 9) {
      while (++j < 9) {
        let combined = rows[i] | cols[j] | sqrs[dict[k]]
        if(combined !== 511){
          let positions = []
          for (let p = 0; p < 9; p++) {
            if (!(combined & (1 << p))) { positions.push(p) }
          }

          let a = positions[(Math.random() * positions.length) << 0]
          backArr[k] = combined + bitDict[a]
          matrix[i][j] = a + 1

          rows[i] += bitDict[a]
          cols[j] += bitDict[a]
          sqrs[dict[k]] += bitDict[a]
          k++

        } else {
          do {
            k--
            if (j === 0) { j = 8; i--; } else { j--; }
            let b = matrix[i][j] - 1
            rows[i] -= bitDict[b]
            cols[j] -= bitDict[b]
            sqrs[dict[k]] -= bitDict[b]
          } while (backArr[k] === 511 || undefined)

          let p = 0
          for (; p < 9; p++) {
            if (!(backArr[k] & (1 << p))) { break }
          }
          backArr[k] += bitDict[p]
          matrix[i][j] = p + 1

          rows[i] += bitDict[p]
          cols[j] += bitDict[p]
          sqrs[dict[k]] += bitDict[p]
          k++
        }
      }
      j = -1
    }
    return matrix
  }

  function testPure (fn, times) {
    const start = new Date().getTime()
    for (let i = 0; i < times; i++) {
      fn()
    }
    const end = new Date().getTime()
    console.log('8万次用时', end - start)
    return end - start
  }

  function testTime(){
    const start = new Date().getTime()
    for (let i = 0; i < 80000; i++) { algorithm_v8() }
    const end = new Date().getTime()
    let time = end - start
    console.log('用时', time)
    setBoard(algorithm_v8())
    document.getElementById("result").innerHTML = '8万次用时 ' + String(time) + 'ms'
  }

  function setBoard(num){
    var location = new Array(9);
    var i,j,row,col;
    for(i = 0; i < 9; i++)
    location[i] = ['','','','','','','','',''];
    var loc = 'v';
    var loca;
    for(i = 1;i < 10;i++)
    for(j = 1;j < 10;j++)
    {
      loca = loc + i + '_' + j;
      row = i - 1;
      col = j - 1;
      location[row][col] = document.getElementById(loca);
      location[row][col].innerHTML = num[row][col];
    }

  }

  function mOut(obj){
    obj.style.background = "transparent";
  }

  function mOver(obj){
    obj.style.background = "lightgrey";
  }
  </script>

    <style type="text/css">
      .main{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
      };
        table {
            margin:0 auto;
    border-collapse:collapse;
        }
        td.big
        {
            width:144px;
            height:144px;
            border:2px solid blue;
        }
        td.small
        {
            width:47px;
            height:47px;
            border:1px solid cornflowerblue;
            font-size:20px;
            text-align:center;
            font-family:Verdana;
        }
    </style>
</head>
<body onload="testTime()">
  <h2 align="center">v9 数独游戏</h2>
  <div class="main">

    <button onclick="testTime()">生成棋盘</button>
    <pre style="margin-left: 10px;" id="result"></pre>
  </div>

  <table align="center">
    <tr>
        <td class="big">
            <table >
                <tr>
                    <td id="v1_1" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v1_2" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v1_3" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v2_1" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v2_2" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v2_3" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v3_1" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v3_2" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v3_3" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
            </table>
        </td>
        <td class="big">
            <table bgcolor="lavender">
                <tr>
                    <td id="v1_4" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v1_5" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v1_6" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v2_4" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v2_5" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v2_6" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v3_4" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v3_5" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v3_6" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
            </table>
        </td>
        <td class="big">
            <table >
                <tr>
                    <td id="v1_7" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v1_8" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v1_9" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v2_7" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v2_8" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v2_9" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v3_7" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v3_8" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v3_9" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td class="big">
            <table bgcolor="lavender">
                <tr>
                    <td id="v4_1" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v4_2" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v4_3" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v5_1" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v5_2" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v5_3" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v6_1" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v6_2" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v6_3" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
            </table>
        </td>
        <td class="big">
            <table >
                <tr>
                    <td id="v4_4" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v4_5" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v4_6" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v5_4" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v5_5" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v5_6" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v6_4" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v6_5" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v6_6" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
            </table>
        </td>
        <td class="big">
            <table bgcolor="lavender" >
                <tr>
                    <td id="v4_7" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v4_8" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v4_9" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v5_7" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v5_8" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v5_9" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v6_7" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v6_8" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v6_9" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
            </table>
        </td>

    </tr>
    <tr>
        <td class="big">
            <table>
                <tr>
                    <td id="v7_1" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v7_2" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v7_3" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v8_1" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v8_2" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v8_3" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v9_1" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v9_2" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v9_3" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
            </table>
        </td>
        <td class="big">
            <table bgcolor="lavender">
                <tr>
                    <td id="v7_4" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v7_5" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v7_6" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v8_4" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v8_5" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v8_6" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v9_4" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v9_5" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v9_6" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
            </table>
        </td>
        <td class="big">
            <table>
                <tr>
                    <td id="v7_7" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v7_8" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v7_9" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v8_7" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v8_8" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v8_9" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
                <tr>
                    <td id="v9_7" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v9_8" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                    <td id="v9_9" class="small" onmouseover="mOver(this)" onmouseout="mOut(this)"></td>
                </tr>
            </table>
        </td>

    </tr>
</table>
</body>
