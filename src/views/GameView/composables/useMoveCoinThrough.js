import {toRefs, ref} from "vue";
import useCheckWinner from "@/views/GameView/composables/useCheckWinner";

export default function useMoveCoinThrough(options) {
  const {activePlayer, board, moving, active, radIndex} = toRefs(options);

  const winner = ref(null);
  const {checkWinner} = useCheckWinner({board, winner})
  async function enterExit(el, end=false) {
    setTimeout(() => {
      el.classList.remove("exit");
      el.classList.remove(`moving-${activePlayer.value !== 1 ? 'red' : 'yellow'}`);
      el.classList.add(`moving-${activePlayer.value === 1 ? 'red' : 'yellow'}`);
      el.classList.add(`enter`);
    }, 100)

    setTimeout(() => {
      if (el) el.classList.remove(`moving-${activePlayer.value === 1 ? 'red' : 'yellow'}`);
    }, 500)

    return new Promise((resolve) => {
      setTimeout(() => {
        if (!end) {
          el.classList.remove(`enter`);
          el.classList.add('exit');
        }
        resolve()
      } ,220)
    })
  }


  function getLastEmptyCell(col) {
    let cell = null;
    let row = 0;
    while (row < 6) {
      cell = board.value[row][col];
      if (cell) break;
      row++;
    }
    if (row > 0) return row - 1;
  }

  async function putHere(event) {
    if (moving.value) return;
    const target = event.target;
    const col = target.dataset.col || radIndex;

    const cellsInColumn = Array.from(document.querySelectorAll(`[data-col="${col}"]`));
    const emptyCell = getLastEmptyCell(col);
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
    if (checkWinner) checkWinner();
    active.value = (active.value + 1) % 2
  }

return toRefs({
  putHere,
  winner
})
}