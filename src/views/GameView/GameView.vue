<template>
  <div class="root">

    <footer :class="winner ? getPlayerColor(winner.player) : ''"></footer>

    <main>
      <div class="container" style="--max-width: 632px">
        <nav>
          <button class="nav-btn" @click="handlePause">Menu</button>
          <img src="@/assets/logo.svg" alt="">
          <button class="nav-btn" @click="reset(true)">Restart</button>
        </nav>
      </div>

      <div class="container rel" style="--max-width: 632px">
        <div class="score-cards">
          <div :class="['score-card', 'one', {'v-person': !vsCPU}]">
            <div class="face-wrapper">
              <div class="face hard-shadow">

                <svg v-if="vsCPU" width="28" height="22" viewBox="0 0 28 22" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M0.75 8.25C0.75 15.7058 6.79416 21.75 14.25 21.75C21.7058 21.75 27.75 15.7058 27.75 8.25H24.75C24.75 14.049 20.049 18.75 14.25 18.75C8.45101 18.75 3.75 14.049 3.75 8.25H0.75Z"
                      fill="black"/>
                  <path d="M18 0V5.9844H21V0H18Z" fill="black"/>
                  <path d="M8 0V5.9844H11V0H8Z" fill="black"/>
                </svg>

                <svg v-else width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M27.25 8C27.25 15.4558 21.2058 21.5 13.75 21.5C6.29416 21.5 0.25 15.4558 0.25 8H3.25C3.25 13.799 7.95101 18.5 13.75 18.5C19.549 18.5 24.25 13.799 24.25 8H27.25Z"
                      fill="black"/>
                  <path d="M12.75 0V5.9844H9.75V0H12.75Z" fill="black"/>
                  <path d="M22.75 0V5.9844H19.75V0H22.75Z" fill="black"/>
                </svg>


              </div>
            </div>
            <div class="text hard-shadow">
              <div class="name" v-if="vsCPU">You</div>
              <div class="name" v-else>Player 1</div>
              <h1 class="score">{{ scores?.[1] }}</h1>
            </div>
          </div>
          <div :class="['score-card', 'two', {'v-person': !vsCPU}]">
            <div class="face-wrapper">
              <div class="face hard-shadow">
                <svg v-if="vsCPU" width="24" height="10" viewBox="0 0 24 10" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.5 0V3H14.5V0H20.5Z" fill="black"/>
                  <path d="M9.5 0V3H3.5V0H9.5Z" fill="black"/>
                  <path d="M24 7V10H0V7H24Z" fill="black"/>
                </svg>

                <svg v-else width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M0.75 8C0.75 15.4558 6.79416 21.5 14.25 21.5C21.7058 21.5 27.75 15.4558 27.75 8H24.75C24.75 13.799 20.049 18.5 14.25 18.5C8.45101 18.5 3.75 13.799 3.75 8H0.75Z"
                      fill="black"/>
                  <path d="M15.25 0V5.9844H18.25V0H15.25Z" fill="black"/>
                  <path d="M5.25 0V5.9844H8.25V0H5.25Z" fill="black"/>
                </svg>

              </div>
            </div>
            <div class="text hard-shadow">
              <div class="name" v-if="vsCPU">CPU</div>
              <div class="name" v-else>Player 2</div>
              <div class="score">{{ scores?.[2] }}</div>
            </div>
          </div>
        </div>

        <div :class="['board', 'hard-shadow']" :key="renderKey">
          <template v-for="(row, row_index) in board" :key="row_index">
            <div :class="['cell']" v-for="(col, col_index) in row" :key="`${row_index}, ${col_index}`"
                 :data-row="row_index"
                 :data-col="col_index"
                 @click="putHere(col_index)"
                 @mouseover="setRadPos"
                 :style="{cursor: moving ? 'progress' : 'auto'}"
            >
              <div :class="['coin', {'red': col === 1, 'yellow': col === 2}]"></div>
            </div>
          </template>

          <div class="radar" :style="{left: `${radPos}px`}">
            <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_0_4141)">
                <path :class="['radar-visible', activePlayer === 1 ? 'red' : 'yellow']" fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3 14.6159C3 16.194 3.74501 17.6795 5.0098 18.6233L15.9416 26.7804C17.708 28.0984 20.129 28.1045 21.9019 26.7953L32.9701 18.6225C34.2467 17.6799 35 16.1872 35 14.6002V8C35 5.23858 32.7614 3 30 3H8C5.23858 3 3 5.23858 3 8V14.6159Z"
                      fill="#FD6687"/>
                <path
                    d="M4.11274 19.8255C2.46852 18.5986 1.5 16.6675 1.5 14.6159V8C1.5 4.41015 4.41015 1.5 8 1.5H30C33.5899 1.5 36.5 4.41015 36.5 8V14.6002C36.5 16.6632 35.5207 18.6037 33.8611 19.8292L22.7929 28.002C20.4881 29.7039 17.3408 29.696 15.0446 27.9826L4.11274 19.8255Z"
                    stroke="black" stroke-width="3"/>
              </g>
              <defs>
                <filter id="filter0_d_0_4141" x="0" y="0" width="38" height="35.7731" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                 result="hardAlpha"/>
                  <feOffset dy="5"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_4141"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_4141" result="shape"/>
                </filter>
              </defs>
            </svg>

          </div>
        </div>
        <div :class="['arrow', playerColor]" v-if="!winner && !draw">
          <svg width="197" height="165" viewBox="0 0 197 165" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_0_3849)">
              <path :class="['arrow-path']" fill-rule="evenodd" clip-rule="evenodd"
                    d="M3 55.2795C3 47.2326 7.82258 39.9694 15.2389 36.8468L90.2793 5.25082C95.2186 3.17114 100.786 3.16075 105.733 5.22198L181.692 36.8718C189.145 39.9772 194 47.2593 194 55.3333V132C194 143.046 185.046 152 174 152H23C11.9543 152 3 143.046 3 132V55.2795Z"
                    fill="#FFCE67"/>
              <path
                  d="M14.6568 35.4643C6.68427 38.8212 1.5 46.6291 1.5 55.2795V132C1.5 143.874 11.1259 153.5 23 153.5H174C185.874 153.5 195.5 143.874 195.5 132V55.3333C195.5 46.6538 190.281 38.8255 182.269 35.4872L106.31 3.83737C100.992 1.62154 95.0069 1.63271 89.6972 3.86836L14.6568 35.4643Z"
                  stroke="black" stroke-width="3"/>
            </g>
            <defs>
              <filter id="filter0_d_0_3849" x="0" y="0.683472" width="197" height="164.317" filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                               result="hardAlpha"/>
                <feOffset dy="10"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_3849"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_3849" result="shape"/>
              </filter>
            </defs>
          </svg>
          <div class="content">
            <div class="turn">
              <template v-if="vsCPU">
                <template v-if="activePlayer === 1">Your turn</template>
                <template v-else>CPU's turn</template>
              </template>
              <template v-else>
                <template v-if="activePlayer === 1">Player 1's Turn</template>
                <template v-else>Player 2's Turn</template>
              </template>
            </div>
            <div class="time">
              {{ secondsLeft }}s
            </div>
          </div>
        </div>
        <div class="announce-winner hard-shadow" v-else-if="winner">
          <template v-if="vsCPU">
            <div class="player" v-if="winner.player === 2">CPU</div>
            <div class="player" v-else>You</div>
            <h1>Wins</h1>
            <div class="nav-btn" @click="reset(false)">Play Again</div>
          </template>
          <template v-else>
            <div class="player" >Player {{ winner.player }}</div>
            <h1>Wins</h1>
            <div class="nav-btn" @click="reset(false)">Play Again</div>
          </template>
        </div>
        <div class="announce-winner hard-shadow" v-else>
          <div class="player">No one wins</div>
          <h1>DRAW</h1>
          <div class="nav-btn" @click="reset(false)">Play Again</div>
        </div>

      </div>
    </main>

    <CFModal :isOpen="isMenuOpen" :overlay="true" @close="isMenuOpen = false" h="49rem">
      <div class="menu">
        <h1>Pause</h1>
        <div class="actions">
          <ButtonComponent label="Continue Game" @click="resume"></ButtonComponent>
          <ButtonComponent label="Restart" @click="reset(true); isMenuOpen = false"></ButtonComponent>
          <ButtonComponent label="Quit Game" theme="red" @click="quit"></ButtonComponent>
        </div>
      </div>
    </CFModal>
  </div>

</template>

<script>
let timer = null;
</script>
<script setup>
import {useModeStore, usePlayingStateStore} from "@/store";
import {ref, computed, reactive, onMounted, watch} from 'vue'
import CFModal from "@/components/Modal";
import ButtonComponent from "@/components/Button";
import {useRouter} from "vue-router";
import useMoveCoinThrough from "@/views/GameView/composables/useMoveCoinThrough";
import useCheckWinner from "@/views/GameView/composables/useCheckWinner";

const modeStore = useModeStore()
const vsCPU = modeStore.vsCPU;
const playingState = usePlayingStateStore()
const scores = computed(() => playingState.scores[modeStore.vs]);
const router = useRouter()
const isMenuOpen = ref(false)
const renderKey = ref(0);
const moving = ref(false)
const players = ref([1, 2]);
const starter = ref(0);
const active = ref(0);
const activePlayer = computed(() => {
  return players.value[active.value];
});
const playerColor = computed(() => {
  return getPlayerColor(activePlayer.value)
})

function getPlayerColor(player) {
  return player === 1 ? 'red' : 'yellow'
}

const board = ref([
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
])


const radPos = ref(window.innerWidth / 2);
const radIndex = ref(0);

const {checkWinner} = useCheckWinner()
const {putHere, winner, draw, getAvailableCols, getLastEmptyCellRow} = useMoveCoinThrough(reactive({
  activePlayer,
  board,
  active,
  moving,
  radIndex,
  resetTimer,
  stopTimer,
  vsCPU
}))

// const timer = ref(null);
const secondsLeft = computed(() => playingState.timeRemaining / 1000);

watch(() => secondsLeft.value, async () => {
  if (secondsLeft.value === 0) stopTimer()
  if (secondsLeft.value <= 0) {
    await putHere(getRandomCol())
  }
})

watch(() => activePlayer.value, async () => {
  if (activePlayer.value === 2 && vsCPU) {
    console.log('CPU turn');
    const waitTime = Math.ceil(Math.random() * 3) * 1000;
    setTimeout(async () => playCPU(), waitTime);
  }
})

async function playCPU() {
  const availableCols = getAvailableCols(board.value);
  for (let col of availableCols) {
    const boardCopy = board.value.map(row => [...row]);
    const row = getLastEmptyCellRow(col, boardCopy);
    boardCopy[row][col] = 2
    const cpuWins = checkWinner(boardCopy)
    if (cpuWins) {
      await putHere(col, true)
      return;
    }
    boardCopy[row][col] = 1
    const oppWins = checkWinner(boardCopy)
    if (oppWins) {
      await putHere(col, true)
      return;
    }
  }
  await putHere(getRandomCol(), true)
}

function getRandomCol() {
  const availableCols = getAvailableCols(board.value)
  return availableCols[Math.ceil(Math.random() * availableCols.length) - 1]
}

function handlePause() {
  playingState.pause();
  isMenuOpen.value = true;
  clearInterval(timer)
}

function quit() {
  router.push('/')
}

// function changeTurn() {
//   active.value = (active.value + 1) % 2
//   resetTimer()
// }

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  playingState.setTimeRemaining(15 * 1000);
  timer = setInterval(() => {
    playingState.setTimeRemaining(secondsLeft.value > 0 ? playingState.timeRemaining - 1000 : 0)
  }, 1000)
}

function resume() {
  playingState.resume();
  isMenuOpen.value = false;
  if (!winner.value) {
    timer = setInterval(() => {
      playingState.setTimeRemaining(playingState.timeRemaining - 1000)
    }, 1000)
  }
}

function reset(restart = false) {
  board.value = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  renderKey.value++;
  winner.value = null;
  draw.value = false;
  active.value = (starter.value + 1) % players.value.length;
  starter.value = active.value;
  resetTimer();
  if (restart) {
    playingState.resetScore(modeStore.vs)
  }
}

function setRadPos(e) {
  const target = e.target;
  radIndex.value = target.dataset.col;
  const {x, width} = target.getBoundingClientRect()
  radPos.value = x + (width / 2) - 40;
}


onMounted(() => {
  clearInterval(timer);
  playingState.setTimeRemaining(15 * 1000);
  timer = setInterval(() => {
    playingState.setTimeRemaining(playingState.timeRemaining - 1000)
  }, 1000)
})

</script>

<style lang="scss" scoped>
@import "GameView.scorecard";
@import "GameView.board";

.root {
  padding-block: 4rem;
  min-height: 100vh;
  overflow-y: hidden;
  position: relative;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav img {
  width: 4rem;
  height: 4rem;
  @media (min-width: 992px) {
    width: 5.2rem;
    height: auto;
  }
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  padding: 0 2rem;
  border: none;
  border-radius: 2rem;
  color: var(--white);
  background: var(--dark-purple);
  transition: background-color 200ms ease;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: var(--red);
  }
}

.menu {
  h1 {
    color: white;
    text-align: center;
  }

  .actions {
    display: grid;
    grid: auto-flow 1fr / 1fr;
    gap: 2rem;
    margin-top: 4.4rem;
  }
}


main {
  z-index: 1;
}

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  min-height: 31vh;
  width: 100vw;
  background-color: var(--dark-purple);
  margin-top: -16rem;
  border-radius: 4rem 4rem 0 0;
  z-index: 0;

  @media (max-width: 640px) {
    margin-top: -6vw;
    min-height: 30vh;
  }

  @media (max-width: 480px) {
    margin-top: -10vw;
    min-height: 35vh;
  }

  &.red {
    background-color: var(--red);
  }

  &.yellow {
    background-color: var(--yellow);
  }
}
</style>