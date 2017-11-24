// Gridster actions
import AppDispatcher from '../dispatcher/AppDispatcher';
import { WeatherConstants } from '../constants/WeatherConstants';

export function getForecast(response) {
  AppDispatcher.handleServerAction({
    actionType: WeatherConstants.GET_FORECAST
    response: response
  });
}
