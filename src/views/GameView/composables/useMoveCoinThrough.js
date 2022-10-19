import {toRefs, ref} from "vue";
import useCheckWinner from "@/views/GameView/composables/useCheckWinner";
import {useModeStore, usePlayingStateStore} from "@/store";

export default function useMoveCoinThrough(options) {
  const {activePlayer, board, moving, active, radIndex, resetTimer, stopTimer, vsCPU} = toRefs(options);

  const winner = ref(null);
  const draw = ref(false);
  const playingState = usePlayingStateStore()
  const modeStore = useModeStore()

  const {checkWinner, markCells} = useCheckWinner({board, winner, resetTimer, stopTimer})

  async function enterExit(el, end = false) {
    if (!el) return;
    setTimeout(() => {
      el.classList.remove("exit");
      el.classList.remove(`moving-${activePlayer.value !== 1 ? 'red' : 'yellow'}`);
      el.classList.add(`moving-${activePlayer.value === 1 ? 'red' : 'yellow'}`);
      el.classList.add(`enter`);
    }, 50)

    setTimeout(() => {
      if (el) el.classList.remove(`moving-${activePlayer.value === 1 ? 'red' : 'yellow'}`);
    }, 300)

    return new Promise((resolve) => {
      setTimeout(() => {
        if (!end) {
          el.classList.remove(`enter`);
          el.classList.add('exit');
        }
        resolve()
      }, 150)
    })
  }

  function getLastEmptyCellRow(col, innerBoard = null) {
    let cell = null;
    let row = 0;
    while (row < 6) {
      cell = (innerBoard ? innerBoard : board.value)[row][col];
      if (cell) break;
      row++;
    }
    if (row > 0) return row - 1;
  }

  function getAvailableCols(board) {
    const availableCols = [];
    board[0].forEach((c, i) => {
      if (!c) availableCols.push(i);
    });
    return availableCols;
  }

  function checkIfDraw(b) {
    return !getAvailableCols(b).length
  }

  function setDraw() {
    draw.value = true
    resetAndStopTimer()
  }

  function handleDraw(b) {
    if (checkIfDraw(b)) {
      setDraw()
    }
    return checkIfDraw(b)
  }

  function resetAndStopTimer() {
    resetTimer.value()
    stopTimer.value()
  }

  async function putHere(selectedCol, fromCPU=false) {
    if (moving.value || winner.value || (activePlayer.value === 2 && vsCPU.value && !fromCPU)) return;
    const col = selectedCol ?? radIndex;
    const cellsInColumn = Array.from(document.querySelectorAll(`[data-col="${col}"]`));
    const emptyCell = getLastEmptyCellRow(col);
    if (isNaN(parseInt(emptyCell))) return;

    async function moveCoin(index) {
      const end = index === emptyCell;
      await enterExit(cellsInColumn[index], end);
      if (!end)
        return await moveCoin(index + 1)
    }

    moving.value = true;
    await moveCoin(0);
    moving.value = false;

    board.value[emptyCell][col] = activePlayer.value;

    if (checkWinner) {
      const winDetails = checkWinner(board.value)
      if (winDetails) {
        winner.value = winDetails;
        resetAndStopTimer()
        playingState.incrementScore(modeStore.vs, winDetails.player)
        markCells(winDetails.cells)
      }
    }

    active.value = (active.value + 1) % 2

    if (handleDraw(board.value)) return;

    resetTimer.value()
  }

  return {
    putHere,
    winner,
    draw,
    getAvailableCols,
    getLastEmptyCellRow,
    handleDraw,
  }
}