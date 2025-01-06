import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryWeather = ({country}) => {

    const api_key = import.meta.env.VITE_SOME_KEY
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    console.log("Weather", lon, lat, api_key)

    const [weather, setWeather] = useState()

    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
          .then(response => {
            console.log("Weather fetched", response)
            setWeather(response.data)
          })
      }, [])
    
    const format = (num, decimals) => num.toLocaleString('fi-FI', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

    const wind = weather === undefined
    ? "?"
    : weather.wind.speed

    const temperature = weather === undefined
      ? "?"
      : weather.main.temp.toFixed(2)
    
    const feelsLike = weather === undefined
      ? "?"
      : weather.main.feels_like.toFixed(2)

    const imgSrc = weather === undefined || weather.weather.length === 0
        ? null
        : `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    const weatherDescription =  weather === undefined || weather.weather.length === 0
        ? "?"
        : weather.weather[0].description

    return (
        <div>
            wind {wind} m/s
            <br/>
            temperature {temperature} Celsius
            <br/>
            feels like {feelsLike} Celsius
            <br/>
            <br/>
            {weatherDescription}
            <br/>
            <img max="100" width="100" border="1px solid black" src={imgSrc} />
        </div>
    )

}

export default CountryWeather