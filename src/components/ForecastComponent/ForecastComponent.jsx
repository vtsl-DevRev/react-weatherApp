import React from 'react'
import './ForecastComponent.css'

const ForecastComponent = ({ data }) => {
    return (
        <div>
            {
                data.forecast ? (
                    <div>
                        <h2>Forecast</h2>
                        <div id='forecastDetails'>
                            {
                                data.forecast.forecastday.map((day, index) => {
                                    return (
                                        <div key={index} className='forecastDay'>
                                            <h3>{day.date}</h3>
                                            <img src={day.day.condition.icon} alt='Weather Icon' />
                                            <h3>{day.day.condition.text}</h3>
                                            <h3>Max Temp: {day.day.maxtemp_c}°C</h3>
                                            <h3>Min Temp: {day.day.mintemp_c}°C</h3>
                                            <h3>Avg Temp: {day.day.avgtemp_c}°C</h3>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : (
                    <h2>Enter a city name to get the weather details</h2>
                )
            }
        </div>
    )
}

export default ForecastComponent