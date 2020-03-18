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
    if (data.regions[e['Country/Region']] === undefined) {
      data.regions[e['Country/Region']] = {
        total: { deaths: [], confirmed: [], estimated: [] }
      }
    }
    if (e['Province/State'].length > 0) {
      data.regions[e['Country/Region']][e['Province/State']] = {}
    }

    if (data.regions[e['Country/Region']].total.confirmed.length < 1) {
      for (const date in e) {
        if (/^\d{1,2}\/\d{1,2}\/\d{2}$/i.test(date)) {
          data.regions[e['Country/Region']].total.confirmed.push(e[date])
        }
      }
    } else {
      // map and add arrays together into total
    }
  })
  // Parse Confirmed Case
  // Parse Deaths
  // Helper function for mapping deaths to estimated cases
  const mapDeaths = death => {
    const fatalityRate = 0.0087
    const numCasesCausedDeaths = death / fatalityRate
    const daysFromInfectionToDeath = 17.3
    const doublingTime = 6.18
    const numTimesDoubled = daysFromInfectionToDeath / doublingTime
    const trueCases = numCasesCausedDeaths * Math.pow(2, numTimesDoubled)
    return trueCases
  }
}

parseData()
export default data
