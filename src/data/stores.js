import moment from 'moment'
import { derived, writable } from 'svelte/store'

export const data = writable({})
export const dates = writable([])

export const areaType = writable('Global')

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
  if ($areaType === 'Global') {
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
      threeAgo: threeActive,
      style: ''
    }
  } else {
    const today = moment($dateValue)
      .utc()
      .format()
    const todayActive = $data.countries[$areaType].total.active[today]
    const yesterday = moment($dateValue)
      .utc()
      .subtract(1, 'days')
      .format()
    const yesterdayActive = $data.countries[$areaType].total.active[yesterday]
    const twoAgo = moment($dateValue)
      .utc()
      .subtract(2, 'days')
      .format()
    const twoActive = $data.countries[$areaType].total.active[twoAgo]
    const threeAgo = moment($dateValue)
      .utc()
      .subtract(3, 'days')
      .format()
    const threeActive = $data.countries[$areaType].total.active[threeAgo]
    const style = 'underline cursor-pointer hover:text-gray-100 transition-all duration-300 ease-out'
    area = {
      name: $areaType,
      today: todayActive,
      yesterday: yesterdayActive,
      twoAgo: twoActive,
      threeAgo: threeActive,
      style: style
    }
  }
  return area
})

export const subAreas = derived(
  [data, areaType, dateValue, countryStr],
  ([$data, $areaType, $dateValue, $countryStr]) => {
    let subAreas = []
    if ($areaType === 'Global') {
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
        let style = 'cursor-pointer hover:text-gray-100 transition-all duration-300 ease-out'
        if (Object.keys($data.countries[country]).length > 1) {
          hasSubAreas = true
          style = 'underline ' + style
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
    } else {
      for (const area in $data.countries[$areaType]) {
        if (area !== 'total') {
          const today = moment($dateValue)
            .utc()
            .format()
          const todayActive = $data.countries[$areaType][area].active[today]
          const yesterday = moment($dateValue)
            .utc()
            .subtract(1, 'days')
            .format()
          const yesterdayActive = $data.countries[$areaType][area].active[yesterday]
          const twoAgo = moment($dateValue)
            .utc()
            .subtract(2, 'days')
            .format()
          const twoActive = $data.countries[$areaType][area].active[twoAgo]
          const threeAgo = moment($dateValue)
            .utc()
            .subtract(3, 'days')
            .format()
          const threeActive = $data.countries[$areaType][area].active[threeAgo]
          const subArea = {
            name: area,
            today: todayActive,
            yesterday: yesterdayActive,
            twoAgo: twoActive,
            threeAgo: threeActive
          }
          subAreas = [...subAreas, subArea]
        }
      }
    }

    if ($countryStr === '') {
      return subAreas.sort((a, b) => (a.name > b.name ? 1 : -1))
    }
    var re = new RegExp($countryStr, 'gi')
    return subAreas.filter(subArea => subArea.name.match(re)).sort((a, b) => (a.name > b.name ? 1 : -1))
  }
)

export const pinnedAreasList = writable([])
export const pinnedAreas = derived([subAreas, pinnedAreasList], ([$subAreas, $pinnedAreasList]) =>
  $subAreas.filter(o => $pinnedAreasList.includes(o.name))
)
