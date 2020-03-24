import { derived, writable } from 'svelte/store'

export const dates = writable([])

export const filterStr = writable('')

export const dateMax = writable()
export const dateIdx = writable()
export const dateValue = derived([dates, dateIdx], ([$dates, $dateIdx]) => new Date($dates[$dateIdx]))
export const data = writable({})

export const area = derived([data, dates, dateIdx], ([$data, $dates, $dateIdx]) => {
  let area = {}
  const todayDate = $dates[$dateIdx].split('/').join('-')
  const yesterdayDate = $dates[$dateIdx - 1].split('/').join('-')
  const twoAgoDate = $dates[$dateIdx - 2].split('/').join('-')
  const threeAgoDate = $dates[$dateIdx - 3].split('/').join('-')
  let today = 0
  let yesterday = 0
  let twoAgo = 0
  let threeAgo = 0
  if ($data !== {}) {
    for (const subArea in $data[todayDate]) {
      today += $data[todayDate][subArea].active
    }
    for (const subArea in $data[yesterdayDate]) {
      yesterday += $data[yesterdayDate][subArea].active
    }
    for (const subArea in $data[twoAgoDate]) {
      twoAgo += $data[twoAgoDate][subArea].active
    }
    for (const subArea in $data[threeAgoDate]) {
      threeAgo += $data[threeAgoDate][subArea].active
    }
  }
  area = {
    name: 'Global',
    today: today,
    yesterday: yesterday,
    twoAgo: twoAgo,
    threeAgo: threeAgo,
    style: ''
  }
  return area
})

export const subAreas = derived([data, dates, dateIdx], ([$data, $dates, $dateIdx]) => {
  const subAreas = {}
  const todayDate = $dates[$dateIdx].split('/').join('-')
  const yesterdayDate = $dates[$dateIdx - 1].split('/').join('-')
  const twoAgoDate = $dates[$dateIdx - 2].split('/').join('-')
  const threeAgoDate = $dates[$dateIdx - 3].split('/').join('-')
  if ($data !== {}) {
    for (const subArea in $data[todayDate]) {
      subAreas[subArea] = {}
      subAreas[subArea].name = subArea
      subAreas[subArea].today = $data[todayDate][subArea].active
    }
    for (const subArea in $data[yesterdayDate]) {
      subAreas[subArea].yesterday = $data[yesterdayDate][subArea].active
    }
    for (const subArea in $data[twoAgoDate]) {
      subAreas[subArea].twoAgo = $data[twoAgoDate][subArea].active
    }
    for (const subArea in $data[threeAgoDate]) {
      subAreas[subArea].threeAgo = $data[threeAgoDate][subArea].active
    }
  }
  const style = 'cursor-pointer hover:text-gray-100 transition-all duration-300 ease-out'

  console.log(subAreas)
  return Object.values(subAreas)
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
