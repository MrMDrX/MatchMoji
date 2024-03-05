<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Square from "./Square.svelte";
  export let grid: string[];
  export let found: string[];

  const dispatch = createEventDispatcher();

  let m = -1;
  let n = -1;
  let resetTimeout: number;
</script>

<div class="grid">
  {#each grid as emoji, i}
    <Square
      {emoji}
      on:click={() => {
        clearTimeout(resetTimeout);
        if (m === -1 && n === -1) {
          m = i;
        } else if (n === -1) {
          n = i;

          if (grid[m] === grid[n]) {
            dispatch("found", { emoji });
          } else {
            resetTimeout = setTimeout(() => {
              m = n = -1;
            }, 1000);
          }
        } else {
          n = -1;
          m = i;
        }
      }}
      selected={m === i || n === i}
      found={found.includes(emoji)}
      group={grid.indexOf(emoji) === i ? "m" : "n"}
    />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 0.5rem;
    height: 100%;
    perspective: 100vw;
  }
</style>
