import { derived, writable } from 'svelte/store'

export const data = writable({})
export const dates = writable([])

export const regionStr = writable('')
export const regions = derived([regionStr, data], ([$regionStr, $data]) => {
  if ($regionStr === '') {
    return Object.keys($data.countries).sort()
  }

  var re = new RegExp($regionStr, 'gi')

  return Object.keys($data.countries)
    .filter(word => word.match(re))
    .sort()
})

export const dateMax = writable(0)
export const dateIdx = writable(0)
export const dateValue = derived(dateIdx, $dateIdx => dates[$dateIdx])
