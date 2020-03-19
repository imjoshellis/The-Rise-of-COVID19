import { derived, readable, writable } from 'svelte/store'
import data from './data/data.js'

const dates = data.dates

export const regionStr = writable('')
export const regions = derived(regionStr, $regionStr => {
  if ($regionStr === '') {
    return Object.keys(data.regions).sort()
  }

  var re = new RegExp($regionStr, 'gi')

  return Object.keys(data.regions)
    .filter(word => word.match(re))
    .sort()
})

export const dateMax = readable(dates.length - 1)
export const dateIdx = writable(dates.length - 1)
export const dateValue = derived(dateIdx, $dateIdx => dates[$dateIdx])
