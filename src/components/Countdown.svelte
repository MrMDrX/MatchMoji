<script lang="ts">
  export let remaining: number;
  export let duration: number;
</script>

<div class="countdown">
  <button on:click>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Pause</title><path d="M13,16V8H15V16H13M9,16V8H11V16H9M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" fill="#999" /></svg>
  </button>
  <div class="duration">
    <div class="remaining" style="--p:{remaining / duration}"></div>
  </div>
</div>

<style>
  .countdown {
    display: flex;
    align-items: center;
    gap: 1em;
  }
  button {
    font-size: 8em;
    width: 1em;
    height: 1em;
    background: transparent;
    border: none;
  }
  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .duration {
    flex: 1;
    height: 1em;
    background: #999;
  }
  .remaining {
    position: absolute;
    width: calc(100% * var(--p));
    height: 100%;
    background: yellow;
  }
</style>
