import React from 'react';
import WeatherStore from '../stores/WeatherStore.js';
import { getForecast } from '../actions/WeatherServerActions.js';

const itemStyle = {
  display: 'inline-block',
  float: 'left',
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  paddingBottom:'1rem'
}

const ulStyle = {
  display: 'inline-block',
  float: 'left',
  listStyleType: 'none',
  padding: 0,
  margin: 0
}

const divStyle = {
  height: '100px',
  width: '20%',
  textAlign: 'center',
  padding: '1em',
  margin: '0 auto 1em',
  display: 'inline-block',
  verticalAlign: 'top'
}

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

                <span>{listItem.dt_txt}</span>

                  {listItem.weather.map(function(weatherItem) {
                    let iconUrl = "http://openweathermap.org/img/w/" + weatherItem.icon + ".png";
                    return (
                      <ul style={ulStyle} key={weatherItem.id} className="item">
                        <li><img src={iconUrl} alt="alt"/></li>
                        <li>{weatherItem.description}</li>
                    </ul>
                    );
                  })}

                  <h3 className="temp">{
                  listItem.main.temp
                  }
                  &#8451;</h3>

                </div>
              );
            })}

          </div>
      </div>

    );
    }

    else if (this.state.loading === true){
      return (
        <div style={divStyle} >
          <div>loading...</div>
          <div className="loader loader--style8" >
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               width="24px" height="30px" viewBox="0 0 24 30">
              <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
              </rect>
              <rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
              </rect>
              <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
              </rect>
            </svg>
          </div>
        </div>
        )
    }

  }

}

