<script lang="ts">
  import Grid from "./Grid.svelte";
  import type { Level } from "$lib/levels";
  import { shuffle } from "$lib/utils";
  import Found from "./Found.svelte";
  import Countdown from "./Countdown.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let size: number;
  let grid: string[] = [];
  let found: string[] = [];
  let remaining: number = 0;
  let duration: number = 0;
  let playing: boolean = false;

  export function start(level: Level) {
    size = level.size;
    remaining = duration = level.duration;

    const sliced = level.emojis.slice();
    const pairs: string[] = [];

    for (let i = 0; i < (size * size) / 2; i += 1) {
      const index = Math.floor(Math.random() * sliced.length);
      const emoji = sliced[index];
      sliced.splice(index, 1);
      pairs.push(emoji);
    }

    grid = shuffle([...pairs, ...pairs]);
    found = [];

    resume();
  }
  export function resume() {
    playing = true;
    countdown();
    dispatch("play");
  }

  function countdown() {
    const start = Date.now();
    let remainingAtStart = remaining;
    function loop() {
      if (!playing) return;

      requestAnimationFrame(loop);

      remaining = remainingAtStart - (Date.now() - start);
      if (remaining <= 0) {
        playing = false;
        dispatch("lose");
      }
    }

    loop();
  }
</script>

<div class="game" style="--size: {size}">
  <div class="info">
    {#if playing}
      <Countdown
        {remaining}
        {duration}
        on:click={() => {
          playing = false;
          dispatch("pause");
        }}
      />
    {/if}
  </div>

  <div class="grid-container">
    {#key grid}
      <Grid
        {grid}
        on:found={(e) => {
          found = [...found, e.detail.emoji];
          if (found.length === (size * size) / 2) {
            playing = false;
            setTimeout(() => {
              playing = false;
              dispatch("win");
            }, 1000);
          }
        }}
        {found}
      />
    {/key}
  </div>
  <div class="info"><Found {found} /></div>
</div>

<style>
  .game {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2em;
    height: 100%;
    font-size: min(1vmin, 0.3em);
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
