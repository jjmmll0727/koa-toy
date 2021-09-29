import axios from 'axios';
import cheerio from 'cheerio';
import {apiKey} from '../../config/openWeatherMapAPI';

export async function scrapWeather(city : String){
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const AxiosInstance = axios.create(); // Create a new Axios Instance
    
    // Send an async HTTP Get request to the url
    AxiosInstance.get(url)
      .then( // Once we have data returned ...
        response => {
          const temp = response.data.main.temp - 273.15
          return temp;
        }
      )
      .catch(console.error); // Error handling
}
