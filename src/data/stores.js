import moment from 'moment'
import Papa from 'papaparse'
import { derived, writable } from 'svelte/store'
import { parseData } from './data.js'

export const dates = writable([])

export const areaType = writable('Global')

export const filterStr = writable('')

export const dateMax = writable()
export const dateIdx = writable()
export const dateValue = derived([dates, dateIdx], ([$dates, $dateIdx]) => new Date($dates[$dateIdx]))
export const data = derived([dates, dateIdx], ([$dates, $dateIdx]) => {
  const data = {}
  if ($dates.length > 0 && $dateIdx) {
    for (let i = 0; i < 4; i++) {
      const currentDate = $dates[$dateIdx - i].split('/').join('-')
      Papa.parse(`https://raw.githubusercontent.com/ulklc/covid19-timeseries/master/report/daily/${currentDate}.csv`, {
        download: true,
        delimiter: ',',
        header: true,
        skipEmptyLines: true,
        complete: o => {
          data[currentDate] = parseData(o)
        }
      })
    }
  }
  return data
})

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
  [data, areaType, dateValue, filterStr],
  ([$data, $areaType, $dateValue, $filterStr]) => {
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
          subAreas = subAreas.filter(o => !o.name.includes(','))
          subAreas = [...subAreas, subArea]
        }
      }
    }

    return subAreas.sort((a, b) => (a.name > b.name ? 1 : -1))
  }
)

export const pinnedAreasList = writable([])
export const pinnedAreas = derived([subAreas, pinnedAreasList], ([$subAreas, $pinnedAreasList]) =>
  $subAreas.filter(o => $pinnedAreasList.includes(o.name))
)

export const subAreasFiltered = derived(
  [subAreas, pinnedAreasList, filterStr],
  ([$subAreas, $pinnedAreasList, $filterStr]) => {
    const removePinned = $subAreas.filter(o => !$pinnedAreasList.includes(o.name))

    if ($filterStr === '') {
      return removePinned
    }
    var re = new RegExp($filterStr, 'gi')
    return removePinned.filter(subArea => subArea.name.match(re)).sort((a, b) => (a.name > b.name ? 1 : -1))
  }
)
