import { derived, writable } from 'svelte/store'

export const data = writable({})
export const dates = writable([])

export const countryStr = writable('')
export const allCountries = writable({})
export const countries = derived([countryStr, data], ([$countryStr, $data]) => {
  if ($countryStr === '') {
    return Object.keys($data.countries).sort()
  }

  var re = new RegExp($countryStr, 'gi')

  return Object.keys($data.countries)
    .filter(word => word.match(re))
    .sort()
})

export const dateMax = writable(0)
export const dateIdx = writable(0)
export const dateValue = derived(dateIdx, $dateIdx => dates[$dateIdx])
