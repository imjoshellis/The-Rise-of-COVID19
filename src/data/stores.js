import { derived, readable, writable } from 'svelte/store'

export const regionStr = writable('')
export const regions = derived(regionStr, $regionStr => {
  if ($regionStr === '') {
    return Object.keys(data.countries).sort()
  }

  var re = new RegExp($regionStr, 'gi')

  return Object.keys(data.countries)
    .filter(word => word.match(re))
    .sort()
})

export const dateMax = readable(dates.length - 1)
export const dateIdx = writable(dates.length - 1)
export const dateValue = derived(dateIdx, $dateIdx => dates[$dateIdx])
