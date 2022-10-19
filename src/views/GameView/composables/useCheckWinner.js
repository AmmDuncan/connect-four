
export default function useCheckWinner() {
  const maxRows = 6;
  const maxCols = 7;

  function checkWinner(board) {
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < maxCols; col++) {
        const valAtPosition = board[row][col];
        if (valAtPosition) {
          const cells = [
            [...checkDirection(board, row, col, valAtPosition, 'decline')],
            [...checkDirection(board, row, col, valAtPosition, 'incline')],
            [...checkDirection(board, row, col, valAtPosition, 'vertical')],
            [...checkDirection(board, row, col, valAtPosition, 'horizontal')],
          ];
          for (let checks of cells) {
            if (checks.length >= 4) {
              return {player: valAtPosition, cells: checks};
            }
          }
        }
      }
    }
  }


  function checkDirection(board, row, col, value, direction) {
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
        [row, col], ...(checkDirection(board, next_row, next_col, value, direction) || [])
      ]
    }
  }

  function markCells(cells) {
    for (let cell of cells) {
      const el = document.querySelector(`[data-row="${cell[0]}"][data-col="${cell[1]}`);
      el.classList.add('win')
    }
  }

  return {
    checkWinner,
    markCells
  }
}