<script lang="ts">
  import { receive } from "$lib/transitions";
  import { getTwemoji } from "$lib/utils";

  export let found: string[];
</script>

<div class="found">
  {#each found as emoji (emoji)}
    <div class="pair">
      <img in:receive={{ key: `${emoji}:m` }} src={getTwemoji(emoji)} alt={emoji} />
      <img in:receive={{ key: `${emoji}:n` }} src={getTwemoji(emoji)} alt={emoji} />
    </div>
  {/each}
</div>

<style>
  .found {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    z-index: 3;
    filter: drop-shadow(0.2em 0.4em 0.6em rgba(0, 0, 0, 0.4));
  }
  .pair {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: max(2.5em, calc(80em / (var(--size) * var(--size))));
    width: 2em;
    aspect-ratio: 1;
    background: var(--bg-1);
    border-radius: 50%;
  }

  img {
    display: block;
    position: absolute;
    width: 1.5em;
    height: 1.5em;
    line-height: 1;
  }
</style>
