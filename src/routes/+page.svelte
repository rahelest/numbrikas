<script lang="ts">
  import { firstSelectedCellIndex, isDarkMode, isHoverMode, moveFuture, moveHistory, table } from '$lib/stores'
  import { getNewEmptyTable } from '$lib/tableSchema'
  import { checkPair } from '$lib/checkPair'

  const saveToHistory = ()=> {
    moveHistory.update((old) => [...old, $table])
    moveFuture.set([])
  }

  const restart = () => {
    saveToHistory()
    table.set(getNewEmptyTable())
    firstSelectedCellIndex.set(undefined)
  }

  const expand = () => {
    saveToHistory()
    table.update((oldTable) => {
      return oldTable.slice(0).concat(...oldTable.filter((n) => n > 0))
    })
  }

  const select = (index: number) => {
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
      saveToHistory()
      table.set(maybeUpdatedTable)
      firstSelectedCellIndex.set(undefined)
    } catch (error) {
      // console.error(error)
      // No match
      firstSelectedCellIndex.set(index)
    }
  }

  const undo = () => {
    if ($moveHistory.length > 0) {
      firstSelectedCellIndex.set(undefined)
      const lastState = $moveHistory[$moveHistory.length - 1]
      moveHistory.update((old) => old.slice(0, $moveHistory.length - 1))
      moveFuture.update(old => [$table, ...old])
      table.set(lastState)
    }
  }

  const redo = () => {
    if ($moveFuture.length >0) {
      firstSelectedCellIndex.set(undefined)
      const lastState = $moveFuture[0]
      moveFuture.update((old) => old.slice(1))
      moveHistory.update(old => [...old, $table])
      table.set(lastState)
    }
  }

  const toggleDarkMode = () => {
    isDarkMode.update((old) => !old)
    document.body.classList.toggle('dark')
  }

  const toggleHoverMode = () => {
    isHoverMode.update((old) => !old)
  }

  let selectionTimeout: ReturnType<typeof setTimeout>
  const startSelection = (index: number) => {
    selectionTimeout = setTimeout(() => {
      select(index)
    }, 200)
  }

  const endSelection = () => {
    clearTimeout(selectionTimeout)
  }

  $: totalCells = $table.filter(Boolean).length
  $: totalRows = Math.ceil($table.length / 9)
  $: baseList = new Array(9).fill(1).map((_, i) => i + 1)
  $: perVal = baseList.map((e) => [e, $table.filter((val) => val === e).length])
</script>

<template>
  <div class="main__menu">
    <button on:click={undo} disabled={!$moveHistory.length}>Undo</button>
    <button on:click={redo} disabled={!$moveFuture.length}>Redo</button>
    <button on:click={expand}>Expand</button>
    <button on:click={restart}>Restart</button>
    <button on:click={toggleDarkMode}>Dark/Light</button>
    <button on:click={toggleHoverMode}>{$isHoverMode ? 'Hover' : 'Click'}</button>
  </div>

  <div class="main__wrapper">
    <p>
      Clear board by finding <a href="/guide" target="_blank">pairs</a>
    </p>
    <div class="main__table">
      <div class="main__stats">
        Stats:
        <br />Cells: {totalCells}
        <br />Rows: {totalRows}
        <br />
        {#each perVal as val (val)}<br />{val[0]}: {val[1]}{/each}
      </div>

      {#each $table as cell, index}
        {#if cell}
          <button
            class="cell notEmpty"
            on:click={cell ? () => select(index) : undefined}
            on:mouseenter={$isHoverMode ? () => startSelection(index) : undefined}
            on:mouseleave={$isHoverMode ? () => endSelection() : undefined}
            class:selected={$firstSelectedCellIndex === index}
            class:one={[1, 9].includes(cell)}
            class:two={[2, 8].includes(cell)}
            class:three={[3, 7].includes(cell)}
            class:four={[4, 6].includes(cell)}
            class:five={[5].includes(cell)}
          >
            {cell}
          </button>
        {:else}
          <div class="cell" />
        {/if}
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
