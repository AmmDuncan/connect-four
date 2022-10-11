import {toRefs} from "vue";

export default function useCheckWinner(options) {
  const {board: boardRef, winner} = toRefs(options)
  const board = boardRef.value;
  const maxRows = 6;
  const maxCols = 7;

  function checkWinner() {
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < maxCols; col++) {
        const valAtPosition = board[row][col];
        if (valAtPosition) {
          const cells = [
            [...checkDirection(row, col, valAtPosition, 'decline')],
            [...checkDirection(row, col, valAtPosition, 'incline')],
            [...checkDirection(row, col, valAtPosition, 'vertical')],
            [...checkDirection(row, col, valAtPosition, 'horizontal')],
          ]
          for (let checks of cells) {
            if (checks.length >= 4) {
              console.log(valAtPosition)
              winner.value = {player: valAtPosition, cells: checks};
              return;
            }
          }
        }
      }
    }
  }


  function checkDirection(row, col, value, direction) {
    if (row >= maxRows || col >= maxCols) return []
    const directions = {
      'decline': [row + 1, col + 1],
      'incline': [row + 1, col - 1],
      'vertical': [row + 1, col],
      'horizontal': [row, col + 1]
    }
    const [next_row, next_col] = directions[direction]
    if (board[row][col] === value) {
      return [
        [row, col], ...(checkDirection(next_row, next_col, value, direction) || [])
      ]
    }
  }

  return {
    checkWinner
  }
}