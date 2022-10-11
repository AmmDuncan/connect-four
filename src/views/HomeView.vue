<template>
  <div class="root">
    <div class="card">
      <img class="logo" src="@/assets/logo.svg" alt=""/>
      <div class="actions">
        <ButtonComponent label="Play vs CPU" theme="red" :left="true" @click="handleP2CPU">
          <template v-slot:icon>
            <svg width="82" height="46" viewBox="0 0 82 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="59" cy="23" r="23" fill="white"/>
              <circle cx="59" cy="23" r="20" fill="#FD6687"/>
              <path d="M66.0834 14.4165V17.4165H61.0834V14.4165H66.0834Z" fill="white"/>
              <path d="M56.9166 14.4165V17.4165H51.9166V14.4165H56.9166Z" fill="white"/>
              <path d="M69 20.25V23.25H49V20.25H69Z" fill="white"/>
              <circle cx="23" cy="23" r="23" fill="white"/>
              <circle cx="23" cy="23" r="20" fill="#FD6687"/>
              <path
                  d="M35.25 21.208C35.25 27.5593 30.1013 32.708 23.75 32.708C17.3987 32.708 12.25 27.5593 12.25 21.208H15.25C15.25 25.9024 19.0556 29.708 23.75 29.708C28.4444 29.708 32.25 25.9024 32.25 21.208H35.25Z"
                  fill="white"/>
              <path d="M20.5416 14.6665V19.6535H17.5416V14.6665H20.5416Z" fill="white"/>
              <path d="M28.875 14.6665V19.6535H25.875V14.6665H28.875Z" fill="white"/>
            </svg>

          </template>
        </ButtonComponent>
        <ButtonComponent label="Play vs Player" theme="yellow" @click="handleP2P" :icon="true" :left="true">
          <template v-slot:icon>
            <svg width="82" height="46" viewBox="0 0 82 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="59" cy="23" r="23" fill="black"/>
              <circle cx="59" cy="23" r="20" fill="#FFCE67"/>
              <path
                  d="M74.5833 21.208C74.5833 27.5593 69.4345 32.708 63.0833 32.708C56.732 32.708 51.5833 27.5593 51.5833 21.208H54.5833C54.5833 25.9024 58.3888 29.708 63.0833 29.708C67.7777 29.708 71.5833 25.9024 71.5833 21.208H74.5833Z"
                  fill="black"/>
              <path d="M62.375 14.6665V19.6535H59.375V14.6665H62.375Z" fill="black"/>
              <path d="M70.7083 14.6665V19.6535H67.7083V14.6665H70.7083Z" fill="black"/>
              <circle cx="23" cy="23" r="23" fill="black"/>
              <circle cx="23" cy="23" r="20" fill="#FFCE67"/>
              <path
                  d="M38.5833 21.208C38.5833 27.5593 33.4345 32.708 27.0833 32.708C20.732 32.708 15.5833 27.5593 15.5833 21.208H18.5833C18.5833 25.9024 22.3888 29.708 27.0833 29.708C31.7777 29.708 35.5833 25.9024 35.5833 21.208H38.5833Z"
                  fill="black"/>
              <path d="M26.375 14.6665V19.6535H23.375V14.6665H26.375Z" fill="black"/>
              <path d="M34.7083 14.6665V19.6535H31.7083V14.6665H34.7083Z" fill="black"/>
            </svg>
          </template>
        </ButtonComponent>
        <ButtonComponent label="Game Rules" @click="modalOpen = true" :left="true"></ButtonComponent>
      </div>
    </div>
    <CFModal variant="white-bg" with-check="true" @close="modalOpen = false" :isOpen="modalOpen">
      <GameRules/>
    </CFModal>
  </div>
</template>

<script>
// @ is an alias to /src
import ButtonComponent from "@/components/Button";
import CFModal from "@/components/Modal";
import GameRules from "@/components/GameRules";
import {useModeStore} from "@/store";
import {useRouter} from "vue-router";

export default {
  name: 'HomeView',
  components: {
    GameRules,
    CFModal,
    ButtonComponent,
  },
  data: () => ({
    modalOpen: false,
    p2pIcon: ''
  }),
  setup() {
    const modeStore = useModeStore()
    const router = useRouter()

    function handleP2P() {
      modeStore.setVS('player')
      router.push('/game')
    }

    function handleP2CPU() {
      modeStore.setVS('cpu')
      router.push('/game')
    }

    return {
      handleP2P,
      handleP2CPU
    }
  }
}
</script>

<style lang="scss" scoped>

svg {
  width: 25%;
}

.root {
  position: fixed;
  inset: 0;
  background-color: var(--purple);
  display: flex;
  flex-flow: column;
  align-items: stretch;
  @media (min-width: 768px) {
    background-color: var(--dark-purple);
  }
}

.card {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-block: auto;
  padding: 5rem 2.4rem;

  @media (min-width: 768px) {
    --theme: var(--black);
    width: 100%;
    max-width: 48rem;
    margin-inline: auto;
    padding: 7rem 4rem 6rem;
    border-radius: 4rem;
    border: 3px solid var(--theme);
    background-color: var(--purple);
    box-shadow: 0 1rem 0 var(--theme);
  }
}

.logo {
  margin-bottom: 8rem;
}

.actions {
  width: 100%;
  max-width: 40rem;
  display: grid;
  grid: auto-flow 1fr / 1fr;
  gap: 1.6rem;

  @media (min-width: 768px) {
  }
}
</style>
