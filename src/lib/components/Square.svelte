<script lang="ts">
  import { getTwemoji } from "$lib/utils";
  import { send } from "$lib/transitions";

  export let emoji: string;
  export let selected: boolean;
  export let found: boolean;
  export let group: "m" | "n";
</script>

<div class="square" class:flipped={selected || found}>
  <button on:click disabled={selected || found} />

  <div class="background" class:found />

  {#if !found}
    <img out:send={{ key: `${emoji}:${group}` }} src={getTwemoji(emoji)} alt={emoji} />
  {/if}
</div>

<style>
  .square {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    transition: filter 0.2s;
    transform-style: preserve-3d;
    transform: rotateY(180deg);
    transition: transform 0.4s;
    user-select: none;
  }

  .square * {
    backface-visibility: hidden;
  }

  .flipped {
    transform: rotateY(0);
    z-index: 2;
  }
  button:disabled {
    color: inherit;
  }
  img {
    display: block;
    font-size: 10em;
    width: 1em;
    height: 1em;
    line-height: 1;
    z-index: 2;
    pointer-events: none;
  }
  button {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    cursor: grab;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--bg-2);
    border-radius: 4em;
    transform: rotateY(180deg);
    font-size: inherit;
  }
  .background {
    position: absolute;
    background: var(--bg-1);
    border: 1em solid var(--accent);
    width: 100%;
    height: 100%;
    border-radius: 4em;
    pointer-events: none;
    transition: border 0.2s;
  }
  .background.found {
    border: 2px solid var(--bg-2);
  }
</style>
