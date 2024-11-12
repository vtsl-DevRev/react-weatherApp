import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import './MainComponent.css';
import DetailComponent from '../DetailComponent/DetailComponent';
import ForecastComponent from '../ForecastComponent/ForecastComponent';
import HourComponent from '../HourComponent/HourComponent';

const MainComponent = () => {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState(currentLocation);
    const [weatherData, setWeatherData] = useState({});
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const cityHandler = (event) => {
        setCity(event.target.value);
    };

    const fetchSuggestionData = async () => {
        if (city === '') return;
        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/search.json?key=1e1e9e8caeae4074a9d51316242110&q=${city}`
            );
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const fetchWeatherData = async () => {
        if (query === '') return;
        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/forecast.json?key=1e1e9e8caeae4074a9d51316242110&q=${query}&days=3&aqi=no&alerts=no`
            );
            setWeatherData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const dropDownClick = (event) => {
        setCity(event.target.innerHTML);
        setQuery(`id:${event.target.id}`);
        setSuggestions([]);
    };

    const clearClick = () => {
        document.getElementById('cityInput').value = '';
        setCity('');
        setSuggestions([]);
        setQuery(currentLocation);
    };

    const currentLocation = useMemo(() => {
        const storedCoords = localStorage.getItem('coords');
        if (storedCoords) {
            return storedCoords; 
        }

        let coords = '';
        const geoWatcher = navigator.geolocation.watchPosition(
            (position) => {
                const newCoords = `${position.coords.latitude},${position.coords.longitude}`;
                if (coords !== newCoords) {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setQuery(newCoords); 
                    localStorage.setItem('coords', newCoords); 
                    coords = newCoords; 
                }
            },
            (error) => {
                console.error('Error fetching location:', error);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );

        return coords;
    }, [latitude, longitude]); 

    useEffect(() => {
        fetchSuggestionData();
    }, [city]);

    useEffect(() => {
        fetchWeatherData();
    }, [query]);

    return (
        <div id='main'>
            <div id="search">
                <input id='cityInput' type="text" placeholder="Enter city name" value={city} onChange={cityHandler} />
                <button onClick={clearClick}>X</button>
            </div>
            <div id="dropdown">
                {suggestions.map((suggestion) => (
                    <button
                        key={suggestion.id}
                        id={suggestion.id}
                        className="suggestedCity"
                        onClick={dropDownClick}
                    >
                        {suggestion.name}, {suggestion.region}, {suggestion.country}
                    </button>
                ))}
            </div>
            <div id='weatherComponent'>
                <div>
                    <HourComponent data={weatherData} />
                    <ForecastComponent data={weatherData} />
                </div>
                <DetailComponent data={weatherData} />
            </div>
        </div>
    );
};

export default MainComponent;
