module.exports = {
  createBoard_v5
}
/**
 * v5 位运算+随机第一行
 */
function createBoard_v5 () {
  const start = new Date().getTime()
  algorithm_v9_3()
  const end = new Date().getTime()
  const board = algorithm_v9_3()
  return { matrix: board, time: end - start }
}

function algorithm_v9_3 () {
  const matrix = [[], [], [], [], [], [], [], [], []]
  const backArr = []
  const dict = [0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 3, 3, 3, 4, 4, 4, 5, 5, 5, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 6, 6, 6, 7, 7, 7, 8, 8, 8, 6, 6, 6, 7, 7, 7, 8, 8, 8]
  const bitDict = [1, 2, 4, 8, 16, 32, 64, 128, 256]

  matrix[0] = shuffleFisher([1, 2, 3, 4, 5, 6, 7, 8, 9])

  const rows = [511, 0, 0, 0, 0, 0, 0, 0, 0]
  const cols = [bitDict[matrix[0][0] - 1], bitDict[matrix[0][1] - 1], bitDict[matrix[0][2] - 1], bitDict[matrix[0][3] - 1], bitDict[matrix[0][4] - 1], bitDict[matrix[0][5] - 1], bitDict[matrix[0][6] - 1], bitDict[matrix[0][7] - 1], bitDict[matrix[0][8] - 1]]
  const sqrs = [bitDict[matrix[0][0] - 1] + bitDict[matrix[0][1] - 1] + bitDict[matrix[0][2] - 1], bitDict[matrix[0][3] - 1] + bitDict[matrix[0][4] - 1] + bitDict[matrix[0][5] - 1], bitDict[matrix[0][6] - 1] + bitDict[matrix[0][7] - 1] + bitDict[matrix[0][8] - 1], 0, 0, 0, 0, 0, 0]

  let i = 0; let j = -1; let k = 0

  while (++i < 9) {
    while (++j < 9) {
      const combined = rows[i] | cols[j] | sqrs[dict[k]]
      if (combined !== 511) {
        const positions = []
        for (let p = 0; p < 9; p++) {
          if (!(combined & (1 << p))) { positions.push(p) }
        }

        const a = positions[(Math.random() * positions.length) << 0]
        backArr[k] = combined + bitDict[a]
        matrix[i][j] = a + 1

        rows[i] += bitDict[a]
        cols[j] += bitDict[a]
        sqrs[dict[k]] += bitDict[a]
        k++
      } else {
        do {
          k--
          if (j === 0) { j = 8; i-- } else { j-- }
          const b = matrix[i][j] - 1
          rows[i] -= bitDict[b]
          cols[j] -= bitDict[b]
          sqrs[dict[k]] -= bitDict[b]
        // eslint-disable-next-line no-unmodified-loop-condition
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

function shuffleFisher (arr) {
  let i = arr.length
  while (i > 0) {
    const r = Math.floor(Math.random() * i--);
    [arr[i], arr[r]] = [arr[r], arr[i]]
  }
  return arr
}
