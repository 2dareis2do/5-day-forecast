import React from 'react';
import WeatherStore from '../stores/WeatherStore.js';
import { getForecast } from '../actions/WeatherServerActions.js';
import Loading from './Loading.js'

const itemStyle = {
  display: 'inline-block',
  float: 'left',
  listStyleType: 'none',
  padding: '1rem',
  margin: 0,
  paddingBottom:'1rem',
  minWidth: '12.5%'
}

const ulStyle = {
  display: 'inline-block',
  float: 'left',
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  width: '100%'
}

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
// const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default class Weather extends React.Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = {
      city: [],
      list: [],
      loading: true
    };

  }

  componentDidMount() {
    getForecast();
    WeatherStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    WeatherStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    let item = WeatherStore.getWeather();
    this.setState({
      list:item.list,
      city:item.city,
      loading: item.loading
    });
  }

  _getDay(string) {
    let newString = string.replace(/ /g,"T");
    let date = new Date(newString);
    let day = days[date.getDay()];
    return day;
  }

  _getDate(string) {
    let newString = string.replace(/ /g,"T");
    let date = new Date(newString);
    let localDate = date.toLocaleDateString();
    return localDate;
  }

  _getTime(string) {
    let newString = string.replace(/ /g,"T");
    let date = new Date(newString);
    let local = date.toLocaleTimeString();
    return local;
  }

  render() {

    if(this.state.loading === false) {
          return (

      <div className="weather-container">

        <h1 className="title">5 day weather forecast:  {this.state.city.name}, {this.state.city.country} </h1>
          {this.props.children}
          <div className="weather-items">
                        

           {this.state.list.map(function(listItem, i) {
              return (
                <div key={listItem.dt + i} className="item" style={itemStyle} >
                  
                  <p>{this._getDay(listItem.dt_txt)}</p>
                  <p>{this._getDate(listItem.dt_txt)}</p>
                  <p>{this._getTime(listItem.dt_txt)}</p>

                  <p>{
                  listItem.main.temp
                  }
                  &#8451;</p>

                  {listItem.weather.map(function(weatherItem) {
                    let iconUrl = "http://openweathermap.org/img/w/" + weatherItem.icon + ".png";
                    return (
                      <ul style={ulStyle} key={weatherItem.id} className="item">
                        <li><img src={iconUrl} alt="alt"/></li>
                        <li>{weatherItem.description}</li>
                    </ul>
                    );
                  })}

                </div>
              );
            }, this)}

          </div>
      </div>

    );
    }

    else if (this.state.loading === true){
      return (
        <Loading></Loading>
      )
    }

  }

}

