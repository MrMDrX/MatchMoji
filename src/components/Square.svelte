<script lang="ts">
  import { getTwemoji } from "$lib/utils";
  import { send } from "$lib/transitions";

  export let emoji: string;
  export let selected: boolean;
  export let found: boolean;
  export let group: "m" | "n";
</script>

<div class="square" class:flipped={selected || found}>
  <button on:click />

  <div class="background" />

  {#if !found}
    <img out:send={{ key: `${emoji}:${group}` }} src={getTwemoji(emoji)} alt={emoji} />
  {/if}
</div>

<style>
  .square {
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    transition: transform 0.4s;
  }

  .flipped {
    transform: rotateY(180deg);
  }
  img {
    height: 12em;
    width: 12em;
    pointer-events: none;
    transform: rotateY(180deg);
    backface-visibility: hidden;
  }
  button {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: grab;
    backface-visibility: hidden;
    background: #eee;
    border-radius: 4em;
    font-size: inherit;
  }
  .background {
    position: absolute;
    background: white;
    border: 0.5em solid #eee;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    width: 100%;
    height: 100%;
    border-radius: 4em;
  }
</style>
