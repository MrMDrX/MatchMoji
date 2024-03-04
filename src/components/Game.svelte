<script lang="ts">
  import Grid from "./Grid.svelte";
  import { levels } from "$lib/levels";
  import type { Level } from "$lib/levels";
  import { shuffle } from "$lib/utils";
  import Found from "./Found.svelte";
  import Countdown from "./Countdown.svelte";
  import { onMount } from "svelte";

  const level = levels[0];

  let size: number = level.size;
  let grid: string[] = createGrid(level);
  let found: string[] = [];
  let remaining: number = level.duration;
  let duration: number = level.duration;
  let playing: boolean = false;

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

  function countdown() {
    const start = Date.now();
    let remainingAtStart = remaining;
    function loop() {
      if (playing) return;
      requestAnimationFrame(loop);

      remaining = remainingAtStart - (Date.now() - start);
      if (remaining <= 0) {
        // Game Over
        playing = false;
      }
    }

    loop();
  }

  onMount(countdown);
</script>

<div class="game">
  <div class="info">
    <Countdown {remaining} duration={level.duration} />
  </div>

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
  }

  .grid-container {
    width: 80vmin;
    height: 80vmin;
  }
</style>
