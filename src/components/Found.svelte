<script lang="ts">
  import { getTwemoji } from "$lib/utils";

  export let found: string[];
</script>

<div class="found">
  {#each found as emoji}
    <img src={getTwemoji(emoji)} alt={emoji} />
  {/each}
</div>

<style>
  .found {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
  }
  img {
    height: 12em;
    width: 12em;
  }
</style>
