export const getLatLng = (response) => {
  return {
    lat: response.data.results[0].geometry.lat,
    lng: response.data.results[0].geometry.lng
  }
}

export const get3Words = (response) => {
  return response.data.results[0].annotations.what3words
}

export const getWeatherEndPoints = (response) => {
  return {
    forecastURL: response.data.properties.forecast,
    forecastHourlyURL: response.data.properties.forecastHourly,
    forecastGridDataUrl: response.data.properties.forecastGridData
  }
}

export const getHourlyWeather = (response) => {
  const massagedData = response.data.properties.periods.map(
    ({
      startTime,
      endTime,
      isDaytime,
      temperature,
      windSpeed,
      windDirection,
      shortForecast
    }) => ({
      startTime,
      endTime,
      isDaytime,
      temperature,
      windSpeed: parseInt(windSpeed),
      windDirection,
      shortForecast
    })
  )

  return massagedData
}

export const getDailyForecast = (dailyWeatherResponse, humidityResponse) => {
  const massagedData = dailyWeatherResponse.data.properties.periods.map(
    ({
      startTime,
      endTime,
      isDaytime,
      temperature,
      windSpeed,
      windDirection,
      shortForecast,
      detailedForecast
    }) => ({
      startTime,
      endTime,
      isDaytime,
      temperature,
      windSpeed: parseInt(windSpeed),
      windDirection,
      shortForecast,
      detailedForecast
    })
  )

  const massagedHumidityData = humidityResponse.data.properties.relativeHumidity.values.map(
    ({ validTime, value }) => ({
      timePeriod: validTime.slice(0, -5),
      humidity: value
    })
  )

  return massagedData.map((dayPeriod) => {
    const resultHour = { ...dayPeriod }
    const date = new Date(dayPeriod.startTime)
    const humidityDate = massagedHumidityData.find((hour) => {
      const humidityDate = new Date(hour.timePeriod.slice(0, 10))
      if (
        date.getFullYear() === humidityDate.getFullYear() &&
        date.getMonth() === humidityDate.getMonth() &&
        date.getDate() === humidityDate.getDate()
      ) {
        return true
      }
      return false
    })

    resultHour.humidity = humidityDate.humidity
    // hey!!!!!
    return resultHour
  })
}

export const cityResponseParser = (response) => {
  const cityInformationMapper = (city) => ({
    name: city.formatted,
    coords: { lat: city.geometry.lat, lng: city.geometry.lng }
  })
  const cities = response.results
  return cities.map(cityInformationMapper)
}
