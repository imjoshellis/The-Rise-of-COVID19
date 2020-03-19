const mapDeaths = death => {
  const fatalityRate = 0.0087
  const numCasesCausedDeaths = death / fatalityRate
  const daysFromInfectionToDeath = 17.3
  const doublingTime = 6.18
  const numTimesDoubled = daysFromInfectionToDeath / doublingTime
  const trueCases = numCasesCausedDeaths * Math.pow(2, numTimesDoubled)
  return trueCases
}

const deathArr = [2, 3, 12, 27]

const result = deathArr.map(x => mapDeaths(x))

result
