import confirmedData from './COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv'
import deathData from './COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv'
// import recovered from '../data/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv'
// import population from '../data/Population_by_Country_2018.csv'

export const confirmed = confirmedData
export const deaths = deathData

const data = {
  dates: [],
  regions: {
    //   country01: {
    //     subareas: {
    //       subarea01: { deaths: [], confirmed: [], estimated: [] },
    //       subarea02: { deaths: [], confirmed: [], estimated: [] }
    //     }
    //   }
  }
}

const parseData = () => {
  // Seed the dates array
  for (const date in deaths[0]) {
    if (/^\d{1,2}\/\d{1,2}\/\d{2}$/i.test(date)) {
      data.dates.push(date)
    }
  }
  // Seed the regions and subareas
  confirmedData.forEach(e => {
    // shorthand
    const cr = 'Country/Region'
    const ps = 'Province/State'

    // new region if it doesn't exist yet
    if (data.regions[e[cr]] === undefined) {
      data.regions[e[cr]] = {
        total: { confirmed: [], confirmedDelta: [] }
      }
    }

    // new subarea if it exists in the data
    if (e[ps].length > 0) {
      data.regions[e[cr]][e[ps]] = {
        confirmed: [],
        confirmedDelta: []
      }
    }

    for (const date in e) {
      // if we're on an actual date element
      if (/^\d{1,2}\/\d{1,2}\/\d{2}$/i.test(date)) {
        // figure out what index we're at
        const matchDate = d => d === date
        const idx = data.dates.findIndex(matchDate)

        if (data.regions[e[cr]].total.confirmed[idx] === undefined) {
          // if no data exists yet, create it
          data.regions[e[cr]].total.confirmed[idx] = parseInt(e[date])
        } else {
          // otherwise, add to existing data
          data.regions[e[cr]].total.confirmed[idx] += parseInt(e[date])
        }

        if (data.regions[e[cr]].total.confirmed.length > 2) {
          const i = data.regions[e[cr]].total.confirmed.length - 1
          const today = data.regions[e[cr]].total.confirmed[i] - data.regions[e[cr]].total.confirmed[i - 1]
          const yesterday = data.regions[e[cr]].total.confirmed[i - 1] - data.regions[e[cr]].total.confirmed[i - 2]
          const delta = today - yesterday

          data.regions[e[cr]].total.confirmedDelta[idx] = delta
        } else {
          data.regions[e[cr]].total.confirmedDelta[idx] = 0
        }

        // if subarea is valid, create an array of confirmed and confirmed delta
        if (e[ps].length > 0) {
          data.regions[e[cr]][e[ps]].confirmed.push(parseInt(e[date]))

          if (data.regions[e[cr]][e[ps]].confirmed.length > 2) {
            const i = data.regions[e[cr]][e[ps]].confirmed.length - 1
            const today = data.regions[e[cr]][e[ps]].confirmed[i] - data.regions[e[cr]][e[ps]].confirmed[i - 1]
            const yesterday = data.regions[e[cr]][e[ps]].confirmed[i - 1] - data.regions[e[cr]][e[ps]].confirmed[i - 2]
            const delta = today - yesterday

            data.regions[e[cr]][e[ps]].confirmedDelta[idx] = delta
          } else {
            data.regions[e[cr]][e[ps]].confirmedDelta[idx] = 0
          }
        }
      }
    }
  })
  // Parse Confirmed Case
  // Parse Deaths
  // Helper function for mapping deaths to estimated cases
  // const mapDeaths = death => {
  //   const fatalityRate = 0.0087
  //   const numCasesCausedDeaths = death / fatalityRate
  //   const daysFromInfectionToDeath = 17.3
  //   const doublingTime = 6.18
  //   const numTimesDoubled = daysFromInfectionToDeath / doublingTime
  //   const trueCases = numCasesCausedDeaths * Math.pow(2, numTimesDoubled)
  //   return trueCases
  // }
}

parseData()
export default data
