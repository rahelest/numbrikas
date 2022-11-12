import type { SavedTable } from './models'

export function checkPair(table: SavedTable, firstIndex: number, secondIndex: number) {
  const firstValue = table[firstIndex]
  const secondValue = table[secondIndex]

  const smallerIndex = firstIndex < secondIndex ? firstIndex : secondIndex
  const biggerIndex = firstIndex > secondIndex ? firstIndex : secondIndex
  if (firstValue !== secondValue && firstValue + secondValue !== 10) {
    throw new Error('Bad match')
  }

  const isVertical =
    firstIndex % 9 === secondIndex % 9 &&
    fromToStep(smallerIndex, biggerIndex, 9).every((index) => !table[index])
  if (isVertical) {
    return clearCleanMerge(table, smallerIndex, biggerIndex)
  }

  const isHorizontal = fromToStep(smallerIndex, biggerIndex, 1).every((index) => !table[index])
  if (isHorizontal) {
    return clearCleanMerge(table, smallerIndex, biggerIndex)
  }

  throw new Error('Bad match')
}

function clearCleanMerge(table: SavedTable, smallerIndex: number, biggerIndex: number) {
  const tableCopy = table.slice(0)
  tableCopy[smallerIndex] = 0
  tableCopy[biggerIndex] = 0

  const cleaned = cleanTable(tableCopy, smallerIndex, biggerIndex)
  return mergeRows(cleaned)
}

function cleanTable(table: SavedTable, from: number, to: number) {
  let tableCopy = table.slice(0)
  const bigger = from > to ? from : to
  const smaller = from < to ? from : to

  for (let i = bigger; i >= smaller; i -= 9) {
    tableCopy = checkRow(tableCopy, i) ? removeRow(tableCopy, i) : tableCopy
  }

  return tableCopy
}

function checkRow(table: SavedTable, fromIndex: number) {
  const rowStart = fromIndex - (fromIndex % 9)
  if (rowStart + 8 > table.length) {
    // Last half-row, ignore
    return false
  }
  const fromTo = fromToStep(rowStart - 1, rowStart + 9, 1)
  return fromTo.every((index) => !table[index])
}

function removeRow(table: SavedTable, fromIndex: number) {
  const rowStart = fromIndex - (fromIndex % 9)
  return [...table.slice(0, rowStart), ...table.slice(rowStart + 9)]
}
/*
    012345678
    901234567
    890123456

    2, 11, 20
 */
export function fromToStep(from: number, to: number, step: number) {
  const delta = Math.floor((to - step - from) / step)
  if (delta < 1) {
    return []
  }

  return new Array(delta).fill(1).map((val, index) => from + step * (index + 1))
}

function mergeRows(table: SavedTable): SavedTable {
  let tableCopy: SavedTable = table.slice(0)
  let lastFilled = table.length
  for (let i = table.length - 1; i >= 0; i--) {
    if (table[i]) {
      lastFilled = i
    }

    if (lastFilled - i >= 9) {
      tableCopy = [...table.slice(0, lastFilled - 9), ...table.slice(lastFilled)]
      return tableCopy
    }
  }

  return tableCopy
}
