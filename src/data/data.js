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

export const parseData = dateFile => {
  const data = {}
  dateFile.data.forEach(o => {
    data[o.countryName] = {
      active: o.confirmed - o.cured - o.death,
      confirmed: o.confirmed,
      cured: o.cured,
      death: o.death,
      code: o.countryCode
    }
  })
  return data
}

export const getDates = o => {
  const dates = []
  for (const date in o.data) {
    dates.push(o.data[date].day)
  }
  return dates
}

export const last = function (array, n) {
  if (array == null) return void 0
  if (n == null) return array[array.length - 1]
  return array.slice(Math.max(array.length - n, 0))
}
