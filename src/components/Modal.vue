<template>
  <transition name="pop" appear>
    <div class="modal-root" v-if="isOpen">
      <div :class="['overlay', {'dark': overlay}]" @click="handleOverlayClick"></div>
      <div :class="['modal', 'hard-shadow', {'white-bg': variant === 'white-bg'}]"
           :style="{ ...(h ? {minHeight: h} : {}) }">
        <slot/>
        <ButtonComponent label="" :round="true" theme="red" class="check" v-if="withCheck" @click="$emit('close')">
          <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 11.5819L12.264 21.846L32.11 2" stroke="white" stroke-width="3"/>
          </svg>
        </ButtonComponent>
      </div>
    </div>
  </transition>
</template>

<script>
import ButtonComponent from "@/components/Button";

export default {
  name: "CFModal",
  components: {ButtonComponent},
  props: ['variant', 'withCheck', 'overlay', 'h', 'isOpen'],
  methods: {
    handleOverlayClick() {
      if (!this.withCheck) this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-root {
  position: fixed;
  inset: -50%;
  display: grid;
  place-content: center;
  z-index: 100;
  /*pointer-events: none;*/
}

.overlay {
  position: fixed;
  inset: 0;
  background: transparent;

  &.dark {
    background-color: transparentize(#000, 0.5);
  }
}

.modal {
  position: relative;
  width: calc(100vw - 4rem);
  max-width: 48rem;
  min-height: 53.7rem;
  padding: 3rem 3.4rem 5.4rem;
  border-radius: 4rem;
  z-index: 10;
  pointer-events: auto;
  background-color: var(--purple);
}

.modal.white-bg {
  background-color: var(--white);
}

.check {
  position: absolute;
  bottom: -4rem;
  left: 50%;
  translate: -50% 0;
}
</style>