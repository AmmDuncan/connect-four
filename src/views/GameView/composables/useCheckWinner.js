import {useModeStore, usePlayingStateStore} from "@/store";

export default function useCheckWinner(options) {
  const {winner, resetTimer, stopTimer} = options
  const maxRows = 6;
  const maxCols = 7;
  const playingState = usePlayingStateStore()
  const modeStore = useModeStore()

  function checkWinner(board) {
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < maxCols; col++) {
        const valAtPosition = board.value[row][col];
        if (valAtPosition) {
          const cells = [
            [...checkDirection(board, row, col, valAtPosition, 'decline')],
            [...checkDirection(board, row, col, valAtPosition, 'incline')],
            [...checkDirection(board, row, col, valAtPosition, 'vertical')],
            [...checkDirection(board, row, col, valAtPosition, 'horizontal')],
          ];
          for (let checks of cells) {
            if (checks.length >= 4) {
              winner.value = {player: valAtPosition, cells: checks};
              resetTimer.value();
              stopTimer.value();
              playingState.incrementScore(modeStore.vs, valAtPosition)
              markCells(checks)
              return;
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
    if (board.value[row][col] === value) {
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
    checkWinner
  }
}