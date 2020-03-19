import { derived, readable, writable } from 'svelte/store'
import data from './data/data.js'

const dates = data.dates

export const dateMax = readable(dates.length - 1)
export const dateIdx = writable(dates.length - 1)
export const dateValue = derived(dateIdx, $dateIdx => dates[$dateIdx])
