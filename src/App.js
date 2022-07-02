
import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {

  const [city, setCity] = useState('london');
  const [weatherData, setWeatherData] = useState(null);

  const APIKey = '31bce70d11c10b75c85bc8950ec79c6b'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  const getData = () => {
    axios.get(url)
      .then(res => setWeatherData(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getData();
    document.getElementById("weatherInput").focus();
  }, [])

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = () => {
    getData();
  }

  const handleKeypress = e => {
    if (e.charCode === 13) {
      getData();
    }
  };

  const name = weatherData ? weatherData.name : '';
  const country = weatherData ? weatherData.sys.country : '';
  const humidity = weatherData ? weatherData.main.humidity : '';
  const temp_min = weatherData ? weatherData.main.temp_min : '';
  const temp_max = weatherData ? weatherData.main.temp_max : '';
  const temp = weatherData ? weatherData.main.temp : '';
  const weather = weatherData ? weatherData.weather[0].description : '';
  const iconcode = weatherData ? weatherData.weather[0].icon : '#';

  const d = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  return (
    <div className="App">
      <header className="App-header">
        <div className="weather">
        <h1>Weather App</h1>
          <input id="weatherInput" type="text" name="city" placeholde="city name"
            onChange={handleChange}
            onKeyPress={handleKeypress}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>

        <div className="results" style={styles.results}>
          <div style={{ fontSize: 30 }}>{name}, {country}</div>

          <div style={{ color: 'darkgrey', fontSize: 18 }}>{days[d.getDay()]}, {month[d.getMonth()]} {d.getDate()}, {d.getFullYear()}</div>

          <div style={{ fontSize: 54, fontWeight: 'bold' }}>{Math.round(temp)}℃</div>

          <img src={`http://openweathermap.org/img/w/${iconcode}.png`} alt="Weather icon" />

          <div style={{ textTransform: 'capitalize', marginBottom: 20 }}>{weather}</div>

          <div>Humidity : {humidity}%</div>
          <div>Min : {temp_min}℃</div>
          <div>Max : {temp_max}℃ </div>
        </div>
      </header>

    </div>
  );
}

const styles = {
  results: {
    border: '1px solid #111111',
    borderRadius: 15,
    backgroundColor: '#111',
    padding: '2rem',
    margin: '1rem',
    boxShadow: 'rgb(84 179 207 / 50%) 3px 3px 2px 0px',
  }
}

export default App;