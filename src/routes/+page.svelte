<script lang="ts">
  import { levels } from "$lib/levels";
  import Game from "$lib/components/Game.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import "../styles.css";
  import { confetti } from "@neoconfetti/svelte";

  let state: "waiting" | "playing" | "paused" | "won" | "lost" = "waiting";
  let game: Game;
</script>

<svelte:head>
  <title>MatchMoji</title>
  <meta name="description" content="the emoji matching game" />
</svelte:head>

<main>
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
        <h1>MatchMoji</h1>
        <p>The Emoji Matching Game</p>
      </header>

      {#if state === "won" || state === "lost"}
        <p>You {state}! the game</p>
      {:else if state === "paused"}
        <p>Game paused</p>
      {:else if state === "waiting"}
        <p>Choose a level :</p>
      {/if}

      <div class="buttons">
        {#if state === "paused"}
          <button on:click={() => game.resume()}>Resume</button>
          <button on:click={() => (state = "waiting")}>Quit</button>
        {:else}
          {#each levels as level}
            <button
              on:click={() => {
                game.start(level);
                state = "playing";
              }}>{level.label}</button
            >
          {/each}
        {/if}
      </div>
    </Modal>
  {/if}

  {#if state === "won"}
    <div
      use:confetti={{
        stageWidth: innerWidth,
        stageHeight: innerHeight,
      }}
      class="confetti"
    ></div>
  {/if}
</main>

<style>
  main {
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  header {
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
  h1 {
    font-size: 4em;
    color: var(--accent);
    margin: 0;
    height: 1em;
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
    margin: 1em 0 1em 0;
    font-size: 1.2em;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 0.5em;
  }

  button {
    background: var(--accent);
    color: white;
    font-size: inherit;
    font-family: inherit;
    font-weight: 600;
    border: none;
    padding: 1em;
    border-radius: 0.5em;
  }
  .confetti {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 30%;
    left: 50%;
    pointer-events: none;
  }
</style>
