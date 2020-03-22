import moment from 'moment'
import { derived, writable } from 'svelte/store'

export const data = writable({})
export const dates = writable([])

export const areaType = writable('global')

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
export const dateValue = derived([dates, dateIdx], ([$dates, $dateIdx]) => new Date($dates[$dateIdx]))

export const area = derived([data, areaType, dateValue], ([$data, $areaType, $dateValue]) => {
  let area
  if ($areaType === 'global') {
    const today = moment($dateValue)
      .utc()
      .format()
    const todayActive = $data.active[today]
    const yesterday = moment($dateValue)
      .utc()
      .subtract(1, 'days')
      .format()
    const yesterdayActive = $data.active[yesterday]
    const twoAgo = moment($dateValue)
      .utc()
      .subtract(2, 'days')
      .format()
    const twoActive = $data.active[twoAgo]
    const threeAgo = moment($dateValue)
      .utc()
      .subtract(3, 'days')
      .format()
    const threeActive = $data.active[threeAgo]
    area = {
      name: 'Global',
      today: todayActive,
      yesterday: yesterdayActive,
      twoAgo: twoActive,
      threeAgo: threeActive
    }
  }
  return area
})

export const subAreas = derived([data, areaType, dateValue], ([$data, $areaType, $dateValue]) => {
  let subAreas = []
  if ($areaType === 'global') {
    for (const country in $data.countries) {
      const today = moment($dateValue)
        .utc()
        .format()
      const todayActive = $data.countries[country].total.active[today]
      const yesterday = moment($dateValue)
        .utc()
        .subtract(1, 'days')
        .format()
      const yesterdayActive = $data.countries[country].total.active[yesterday]
      const twoAgo = moment($dateValue)
        .utc()
        .subtract(2, 'days')
        .format()
      const twoActive = $data.countries[country].total.active[twoAgo]
      const threeAgo = moment($dateValue)
        .utc()
        .subtract(3, 'days')
        .format()
      const threeActive = $data.countries[country].total.active[threeAgo]
      let hasSubAreas = false
      let style = ''
      if (Object.keys($data.countries[country]).length > 1) {
        hasSubAreas = true
        style = 'underline cursor-pointer hover:text-gray-400 transition-all duration-300 ease-out'
      }
      const subArea = {
        name: country,
        today: todayActive,
        yesterday: yesterdayActive,
        twoAgo: twoActive,
        threeAgo: threeActive,
        hasSubAreas: hasSubAreas,
        style: style
      }
      subAreas = [...subAreas, subArea]
    }
  }
  return subAreas.sort((a, b) => (a.name > b.name ? 1 : -1))
})
