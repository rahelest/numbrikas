import type { SavedTable } from './models'

const firstRow = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const secondRow = [1, 1, 1, 2, 1, 3, 1, 4, 1]
const thirdRow = [5, 1, 6, 1, 7, 1, 8, 1, 9]
export function getNewEmptyTable(): SavedTable {
  return [...firstRow, ...secondRow, ...thirdRow]
}

export function isTableValid(maybeTable: unknown) {
  if (!Array.isArray(maybeTable)) {
    return false
  }

  return maybeTable.every(Number.isInteger)

  // return maybeTable.every((row) => {
  //   if (!Number.isInteger(row.row)) {
  //     return false
  //   }
  //
  //   if (!Array.isArray(row.data)) {
  //     return false
  //   }
  //
  //   return row.data.every(Number.isInteger)
  // })
}
