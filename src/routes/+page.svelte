<script lang="ts">
  import { firstSelectedCellIndex, isDarkMode, moveHistory, table } from "../lib/stores";
  import { getNewEmptyTable } from "../lib/tableSchema";
  import { checkPair } from "../lib/checkPair";

  const restart = () => {
    moveHistory.update((old) => [...old, $table])
    table.set(getNewEmptyTable())
    firstSelectedCellIndex.set(undefined)
  }

  const expand = () => {
    moveHistory.update((old) => [...old, $table])
    table.update((oldTable) => {
      return oldTable.slice(0).concat(...oldTable.filter((n) => n > 0))
    })
  }

  const select = (index) => {
    if ($firstSelectedCellIndex === undefined) {
      firstSelectedCellIndex.set(index)
      return
    }

    if ($firstSelectedCellIndex === index) {
      firstSelectedCellIndex.set(undefined)
      return
    }

    try {
      const maybeUpdatedTable = checkPair($table, $firstSelectedCellIndex, index)
      moveHistory.update((old) => [...old, $table])
      table.set(maybeUpdatedTable)
    } catch (error) {
      console.error(error)
      // No match
    } finally {
      firstSelectedCellIndex.set(undefined)
    }
  }

  const undo = () => {
    if ($moveHistory.length > 0) {
      firstSelectedCellIndex.set(undefined)
      const lastState = $moveHistory[$moveHistory.length - 1]
      moveHistory.update((old) => old.slice(0, $moveHistory.length - 1))
      table.set(lastState)
    }
  }

  const toggleDarkMode = () => {
    isDarkMode.update((old) => !old)
    document.body.classList.toggle('dark')
  }
</script>

<template>
  <div class="main__menu">
    <button on:click={undo} disabled={!$moveHistory.length}>Undo</button>
    <button on:click={expand}>Expand</button>
    <button on:click={restart}>Restart</button>
    <button on:click={toggleDarkMode}>Dark/Light</button>
  </div>

  <div class="main__wrapper">
    <p>
      Clear board by finding <a href="/guide" target="_blank">pairs</a>
    </p>
    <div class="main__table">
      {#each $table as cell, index}
        <button
          on:click={cell ? () => select(index) : undefined}
          class:selected={$firstSelectedCellIndex === index}
          class:notEmpty={cell > 0}
          class:one={[1, 9].includes(cell)}
          class:two={[2, 8].includes(cell)}
          class:three={[3, 7].includes(cell)}
          class:four={[4, 6].includes(cell)}
          class:five={[5].includes(cell)}
        >
          {cell || ' '}
        </button>
      {/each}
    </div>
  </div>
</template>

<style>
  .notEmpty {
    cursor: pointer;
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>