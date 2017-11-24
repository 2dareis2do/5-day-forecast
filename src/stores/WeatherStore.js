// Weather store
// Requiring the Dispatcher, Constants, and
// event emitter dependencies

import AppDispatcher from '../dispatcher/AppDispatcher';
import { WeatherConstants } from '../constants/WeatherConstants.js';
import { EventEmitter } from 'events';

EventEmitter.prototype._maxListeners = 200;

const CHANGE_EVENT = 'change';

// Define the store as an empty object/array
let _store = {
  list: [],
  city: [],
  loading: false
};

// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
class WeatherStoreClass extends EventEmitter {

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getWeather() {
    return _store;
  }

}

// Initialize the singleton to register with the
// dispatcher and export for React components
const WeatherStore = new WeatherStoreClass();

function updateStore(data) {

  _store.city = data.city;
  _store.list = data.list;
  _store.loading = false;

}

AppDispatcher.register((payload) => {

  const action = payload.action;

  switch(action.actionType) {

    case WeatherConstants.GET_FORECAST_RESPONSE:

    updateStore(action.response.data);
    WeatherStore.emit(CHANGE_EVENT);
    // console.log('_store', _store);

      break;

    default:

      return true;
  }

});

export default WeatherStore;

