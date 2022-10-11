<template>
  <h1>Rules</h1>
  <section>
    <h2>Objective</h2>
    <p>Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or
      diagonally).</p>
  </section>

  <section>
    <h2>How to Play</h2>
    <ol>
      <li>Red goes first in the first game.</li>
      <li>Players must alternate turns, and only one disc can be dropped in each turn.</li>
      <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
      <li>The starter of the previous game goes second on the next game.</li>
    </ol>
  </section>
</template>

<script>
export default {
  name: "GameRules"
}
</script>

<style lang="scss" scoped>
  h1 {
    margin-block: 0.5rem 2rem;
    text-transform: uppercase;
    font-size: var(--heading-l-size);
    text-align: center;
  }

  h2 {
    color: var(--purple);
    text-transform: uppercase;
    font-size: var(--heading-s-size);
  }

  ol {
    display: grid;
    grid: auto-flow max-content / 1fr;
    gap: 1rem;
    padding: 0 0 0 1.7rem;

    li {
      padding-left: 1rem;
    }
  }

  p, li {
    text-transform: none;
    opacity: 0.66;
  }

  p {
    margin-bottom: 3rem;
  }
</style>