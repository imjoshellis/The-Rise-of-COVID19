export const colorizeText = (x, y, today) => {
  if (today > 0) {
    if (x > 1) {
      if (x > y) {
        return 'text-red-500'
      } else {
        return 'text-orange-500'
      }
    } else {
      if (x > y) {
        return 'text-yellow-500'
      } else {
        return 'text-green-500'
      }
    }
  } else {
    return 'text-gray-500'
  }
}
export const colorizeBg = (x, y, today) => {
  if (today > 0) {
    if (x > 1) {
      if (x > y) {
        return 'border-red-600 bg-red-700'
      } else {
        return 'border-orange-500 bg-orange-600'
      }
    } else {
      if (x > y) {
        return 'border-yellow-500 bg-yellow-600'
      } else {
        return 'border-green-500 bg-green-600'
      }
    }
  } else {
    return 'border-gray-800 bg-gray-900'
  }
}

const apiURL = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations?timelines=1'

const data = {}

const parseApi = apiData => {
  data.api = apiData

  // populate global confirmed data
  data.active = {}
  for (const e in apiData.locations[0].timelines.confirmed.timeline) {
    data.active[e] = 0
  }

  // populate countries & subareas
  data.countries = {}
  for (const e in apiData.locations) {
    const country = apiData.locations[e].country
    const province = apiData.locations[e].province
    const confirmedDates = apiData.locations[e].timelines.confirmed.timeline
    const deathDates = apiData.locations[e].timelines.deaths.timeline
    const recoveredDates = apiData.locations[e].timelines.recovered.timeline

    // new country if it doesn't exist yet
    if (data.countries[country] === undefined) {
      data.countries[country] = {
        total: {
          active: {}
        }
      }
    }

    // new subarea if it exists in the data
    if (province.length > 0) {
      data.countries[country][province] = {
        active: {}
      }
    }

    // iterate over timeline
    for (const date in confirmedDates) {
      if (data.countries[country].total.active[date] === undefined) {
        // if no data exists yet, create it
        data.countries[country].total.active[date] =
          parseInt(confirmedDates[date]) - parseInt(deathDates[date]) - parseInt(recoveredDates[date])
      } else {
        // otherwise, add to existing data
        data.countries[country].total.active[date] +=
          parseInt(confirmedDates[date]) - parseInt(deathDates[date]) - parseInt(recoveredDates[date])
      }

      // add to global total
      data.active[date] += parseInt(confirmedDates[date]) - parseInt(deathDates[date]) - parseInt(recoveredDates[date])

      // if subarea is valid
      if (province.length > 0) {
        data.countries[country][province].active[date] =
          parseInt(confirmedDates[date]) - parseInt(deathDates[date]) - parseInt(recoveredDates[date])
      }
    }
  }
}

const renameUS = () => {
  data.countries['United States (USA)'] = data.countries.US // Assign new key
  delete data.countries.US // Delete old key
}

const getApi = async () => {
  const response = await fetch(apiURL, {
    headers: {}
  })

  const apiData = await response.json()

  await parseApi(apiData)
  await renameUS()
  return data
}

export default getApi

export const last = function (array, n) {
  if (array == null) return void 0
  if (n == null) return array[array.length - 1]
  return array.slice(Math.max(array.length - n, 0))
}
