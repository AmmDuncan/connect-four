<template>
  <button :class="['btn', {'with-icon': !!icon, 'round': round, left}, theme]">
    <slot/>
    <span>{{ label }}</span>
    <slot name="icon"/>
  </button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: ['label', 'icon', 'theme', 'type', 'round', 'left']
}
</script>

<style lang="scss" scoped>
.btn {
  --theme: var(--black);

  width: 100%;
  max-width: 40rem;
  height: 7.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  padding-inline: 2rem;
  border: 3px solid var(--theme);
  border-radius: 2rem;
  color: var(--black);
  background: var(--white);
  box-shadow: 0 1rem 0 var(--theme);
  font-size: var(--heading-m-size);
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 200ms ease, box-shadow 200ms ease;


  &.with-icon, &.left {
    justify-content: space-between;
  }


  &.red {
    color: var(--white);
    background-color: var(--red);
  }

  &.yellow {
    background-color: var(--yellow);
  }

  &.round {
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    box-shadow: 0 0.5rem 0 var(--theme);
  }

  @media (max-width: 340px) {
    font-size: 2rem;
  }

}

.btn:hover {
  --theme: var(--dark-purple);
}
</style>