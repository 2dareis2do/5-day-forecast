// Weather actions
import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { WeatherConstants } from '../constants/WeatherConstants';

const weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=metric&appid=7a9a047cd79788f2b905a34f1645d168';

export function getForecastResponse(response) {
  AppDispatcher.handleServerAction({
    actionType: WeatherConstants.GET_FORECAST_RESPONSE,
    response: response
  });
}

export function getForecast() {
  axios(weatherURL)
  .then(getForecastResponse)
  .catch(function(err) {
    console.log('error',err);
  });
}
