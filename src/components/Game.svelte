<script lang="ts">
  import Grid from "./Grid.svelte";
  import { levels } from "../lib/levels";
  import type { Level } from "../lib/levels";
  import { shuffle } from "$lib/utils";
  import Found from "./Found.svelte";

  const level = levels[0];

  let size: number = level.size;
  let grid: string[] = createGrid(level);
  let found: string[] = [];

  function createGrid(level: Level) {
    const copy = level.emojis.slice();
    const pairs: string[] = [];

    for (let i = 0; i < level.size ** 2 / 2; i++) {
      const idx = Math.floor(Math.random() * copy.length);
      const emoji = copy[idx];
      copy.splice(idx, 1);
      pairs.push(emoji);
    }
    pairs.push(...pairs);
    return shuffle(pairs);
  }
</script>

<div class="game">
  <div class="info"></div>

  <div class="grid-container">
    <Grid
      {grid}
      on:found={(e) => {
        found = [...found, e.detail.emoji];
      }}
      {found}
    />
  </div>
  <div class="info"><Found {found} /></div>
</div>

<style>
  .game {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: min(1vmin, 0.3rem);
  }

  .info {
    width: 80vmin;
    height: 10vmin;
    background: purple;
  }

  .grid-container {
    width: 80vmin;
    height: 80vmin;
    background: teal;
  }
</style>
