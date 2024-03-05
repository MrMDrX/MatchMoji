<script lang="ts">
  import { receive } from "$lib/transitions";
  import { getTwemoji } from "$lib/utils";

  export let found: string[];
</script>

<div class="found">
  {#each found as emoji}
    <div class="pair">
      <img in:receive={{ key: `${emoji}:m` }} src={getTwemoji(emoji)} alt={emoji} />
      <img in:receive={{ key: `${emoji}:n` }} src={getTwemoji(emoji)} alt={emoji} />
    </div>
  {/each}
</div>

<style>
  .found {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    height: 100%;
    filter: drop-shadow(0.2em 0.2em 0.5em rgba(0, 0, 0, 0.4));
  }
  img {
    position: absolute;
    height: 6em;
    width: 6em;
  }
  .pair {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12em;
    width: 12em;
    background: white;
    padding: 1em;
    border-radius: 50%;
  }
</style>
