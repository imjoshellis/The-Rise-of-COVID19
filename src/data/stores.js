import moment from 'moment'
import Papa from 'papaparse'
import { derived, writable } from 'svelte/store'
import { parseData } from './data.js'

export const dates = writable([])

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

export const area = derived([data], ([$data]) => {
  let area
  const currentDates = Object.keys($data).sort()
  console.log(currentDates)
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
  return area
})

export const subAreas = derived([data, dateValue, filterStr], ([$data, $dateValue, $filterStr]) => {
  let subAreas = []
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

  return subAreas.sort((a, b) => (a.name > b.name ? 1 : -1))
})

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
