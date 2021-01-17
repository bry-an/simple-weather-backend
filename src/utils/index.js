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
    forecastHourlyURL: response.data.properties.forecastHourly
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

export const getDailyForecast = (response) => {
  const massagedData = response.data.properties.periods.map(
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
  return massagedData
}
