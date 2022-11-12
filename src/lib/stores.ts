import { writable } from 'svelte/store'
import { browser } from '$app/environment'
import { getNewEmptyTable, isTableValid } from './tableSchema'
import type { SavedTable } from './models'

export const firstSelectedCellIndex = writable<number | undefined>()
export const moveHistory = writable<SavedTable[]>([])

moveHistory.subscribe((value) => {
  if (value.length > 10) {
    moveHistory.update((old) => old.slice(1))
  }
})

const initialIsDarkMode = readFromStorage(
  'isDarkMode',
  false,
  (value) => value === true || value === false,
)
export const isDarkMode = writable<boolean>(initialIsDarkMode)

isDarkMode.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('isDarkMode', String(value))
  }
})

const initialTable = readFromStorage('save', getNewEmptyTable(), (value) => isTableValid(value))
export const table = writable<SavedTable>(initialTable)
table.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('save', JSON.stringify(value)) // todo btoa?
  }
})

function readFromStorage<T>(key: string, defaultValue: T, isValid: (value: T) => boolean) {
  if (!browser) {
    return []
  }

  try {
    const storedValue = JSON.parse(window.localStorage.getItem(key) || '')
    if (!isValid(storedValue)) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue))
    }
    return storedValue ?? defaultValue
  } catch (error) {
    return defaultValue
  }
}
