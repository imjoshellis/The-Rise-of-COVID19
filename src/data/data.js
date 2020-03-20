const apiURL = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations?timelines=1'

const data = {}

const parseApi = apiData => {
  data.api = apiData

  // populate global confirmed data
  data.confirmed = {}
  for (const e in apiData.locations[0].timelines.confirmed.timeline) {
    data.confirmed[e] = 0
  }

  // populate countries & subareas
  data.countries = {}
  for (const e in apiData.locations) {
    const country = apiData.locations[e].country
    const province = apiData.locations[e].province
    const dates = apiData.locations[e].timelines.confirmed.timeline

    // new country if it doesn't exist yet
    if (data.countries[country] === undefined) {
      data.countries[country] = {
        total: {
          confirmed: {}
        }
      }
    }

    // new subarea if it exists in the data
    if (province.length > 0) {
      data.countries[country][province] = {
        confirmed: {}
      }
    }

    // iterate over timeline
    for (const date in dates) {
      if (data.countries[country].total.confirmed[date] === undefined) {
        // if no data exists yet, create it
        data.countries[country].total.confirmed[date] = parseInt(dates[date])
      } else {
        // otherwise, add to existing data
        data.countries[country].total.confirmed[date] += parseInt(dates[date])
      }

      // add to global total
      data.confirmed[date] += parseInt(dates[date])

      // if subarea is valid
      if (province.length > 0) {
        data.countries[country][province].confirmed[date] = parseInt(dates[date])
      }
    }
  }
  console.log(data)
}

const getApi = async () => {
  const response = await fetch(apiURL, {
    headers: {}
  })

  const apiData = await response.json()
  console.log(apiData)

  await parseApi(apiData)
}

export const last = function (array, n) {
  if (array == null) return void 0
  if (n == null) return array[array.length - 1]
  return array.slice(Math.max(array.length - n, 0))
}

// const renameUS = () => {
//   data.regions['United States (USA)'] = data.regions.US // Assign new key
//   delete data.regions.US // Delete old key
// }

getApi()
export default data
