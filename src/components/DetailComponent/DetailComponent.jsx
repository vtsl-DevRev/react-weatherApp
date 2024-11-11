import React from 'react'
import './DetailComponent.css'

const DetailComponent = ({ data }) => {

    console.log(data);

    return (
        <React.Fragment>
            {
                (data.location && data.current) ? (
                    <div id='mainDiv'>
                        <div id='locationDetails'>
                            <div id='text'>
                                <h2>{data.location.name}, {data.location.region}, {data.location.country}</h2>
                                <h3>{data.location.localtime}</h3>
                                <h3>{data.current.condition.text}</h3>
                            </div>
                            <div>
                                <img src={data.current.condition.icon} alt='Weather Icon' />
                            </div>
                        </div>
                        <div id='weatherDetails'>
                            <h3>Temperature: {data.current.temp_c}°C</h3>
                            <h3>Feels Like: {data.current.feelslike_c}°C</h3>
                            <h3>Wind Speed: {data.current.wind_kph} km/h</h3>
                            <h3>Humidity: {data.current.humidity}%</h3>
                            <h3>Visibility: {data.current.vis_km} km</h3>
                            <h3>UV Index: {data.current.uv}</h3>
                        </div>
                    </div>
                ) : (
                    <h2>Enter a city name to get the weather details</h2>
                )
            }
        </React.Fragment>
    )
}

export default DetailComponent