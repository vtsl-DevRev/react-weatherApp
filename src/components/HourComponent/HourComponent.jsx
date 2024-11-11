import React, { useRef } from 'react';
import './HourComponent.css';

const HourComponent = ({ data }) => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div>
            {
                data.forecast ? (
                    <div>
                        <h2>Hourly Forecast</h2>
                        <div id='hourlyForecastDetails' ref={scrollRef}>
                            {
                                data.forecast.forecastday[0].hour.map((hour, index) => {
                                    return (
                                        <div key={index} className='hour'>
                                            <h3>{hour.time}</h3>
                                            <img src={hour.condition.icon} alt='Weather Icon' />
                                            <h3>{hour.condition.text}</h3>
                                            <h3>Temp: {hour.temp_c}°C</h3>
                                            <h3>Hum.: {hour.humidity}%</h3>
                                            <h3>UV: {hour.uv}</h3>
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
    );
};

export default HourComponent;
