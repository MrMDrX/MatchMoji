<script lang="ts">
  import { levels } from "$lib/levels";
  import Game from "../components/Game.svelte";
  import Modal from "../components/Modal.svelte";
  import "../styles.css";

  let state: "waiting" | "playing" | "paused" | "won" | "lost" = "waiting";
  let game: Game;
</script>

<Game
  bind:this={game}
  on:play={() => {
    state = "playing";
  }}
  on:pause={() => {
    state = "paused";
  }}
  on:win={() => {
    state = "won";
  }}
  on:lose={() => {
    state = "lost";
  }}
/>

{#if state !== "playing"}
  <Modal>
    <header>
      <h1>Emoji Matching Game</h1>
    </header>
    {#if state === "won" || state === "lost"}
      <p>You {state} the game</p>
    {:else if state === "paused"}
      <p>Game paused</p>
    {:else if state === "waiting"}
      <p>Choose a level :</p>
    {/if}

    <div class="buttons">
      {#if state === "paused"}
        <button>Resume</button>
        <button>Quite</button>
      {:else}
        {#each levels as level}
          <button
            on:click={() => {
              game.start(level);
            }}>{level.label}</button
          >
        {/each}
      {/if}
    </div>
  </Modal>
{/if}

<style>
  h1 {
    font-size: 4em;
    color: chocolate;
  }
  p {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }
</style>
