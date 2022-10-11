<template>
  <transition name="fade" mode="out-in">
    <router-view/>
  </transition>
</template>

<style lang="scss">
@import "@fontsource/space-grotesk/500.css";
@import "@fontsource/space-grotesk/600.css";
@import "@fontsource/space-grotesk/700.css";
@import "@/assets/styles/base/base.scss";

#app {
  font-family: "Space Grotesk", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  text-transform: uppercase;
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  background-color: var(--purple);

}
</style>
