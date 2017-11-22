// import axios from 'axios';
import React from 'react';
import WeatherStore from '../stores/WeatherStore.js';
import { getForecast } from '../actions/WeatherServerActions.js';
import { getForecastResponse } from '../actions/WeatherServerActions.js';

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

// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response
//   } else {
//     var error = new Error(response.statusText)
//     error.response = response
//     throw error
//   }
// }

// function parseJSON(response) {
//   return response.data;
// }

export default class Weather extends React.Component {

  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
    this._onChange = this._onChange.bind(this);
    // this.importState = this.importState.bind(this);
    this.state = {
      city: [],
      list: [],
      loading: true
    };

  }

  // componentDidMount() {
  //   // let weatherURL = this.props.weatherURL;
  //   // axios
  //   //   .get(weatherURL)
  //   //     .then(checkStatus)
  //   //     .then(parseJSON)
  //   //     .then(this.importState)
  //   //     .catch(function(err) {
  //   //       console.log(err);
  //   //     });
  // }

  componentWillMount() {
              console.log('component will  mount');
      
  console.log('this.state', this.state);

  }

  componentDidMount() {
            console.log('component did  mount');
    // setTimeout(WeatherStore.getWeather(this._onChange), 4000);
        // getForecast();
        getForecast();
        WeatherStore.getWeather(this._onChange);
        // console.log('WeatherStore.getWeather() did mount', WeatherStore.getWeather())
        // let item = WeatherStore.getWeather();
        // if (item.list.length !== 0) {
        //   this.setState({list:item.list,
        //                 city:item.city,
        //           loading: item.loading
        //               });
        // }
    // this.setState(WeatherStore.getWeather());

    WeatherStore.addChangeListener(this._onChange);

  }

  componentWillUnmount() {
    console.log('component will un mount');
    WeatherStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log('change event called');
    console.log('WeatherStore.getWeather() on change', WeatherStore.getWeather());
    // this.setState(WeatherStore.getWeather());

       let item = WeatherStore.getWeather();
        // if (item.list.length !== 0) {
          this.setState({list:item.list,
                        city:item.city,
                  loading: item.loading
                      });
        // }
    console.log('this.state onchange', this.state);
  }

  _onClick(event) {
    // console.log('clicked');
        // console.log('WeatherStore.getWeather() on click', WeatherStore.getWeather());
        // console.log('WeatherStore.getWeather() on click city', WeatherStore.getWeather().city);
        // console.log('WeatherStore.getWeather() on click list', WeatherStore.getWeather().list);
            // console.log('this.state clicked', this.state);
        let item = WeatherStore.getWeather();
        if (item.list.length !== 0) {
          this.setState({list:item.list,
                        city:item.city,
                  loading: item.loading
                      });
        }
        // getForecast();
    // console.log('this.state.list.length', this.state.list.length)

  }

  // importState(item) {
  //   this.setState({city:item.city});
  //   this.setState({list:item.list});
  // }

  render() {

    console.log('this.state render', this.state)
        console.log('this.state.list render', this.state.list)

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

                   {
                   listItem.weather.map(function(weatherItem) {
                    var iconUrl = "http://openweathermap.org/img/w/" + weatherItem.icon + ".png";
                    return (
                      <ul style={ulStyle} key={weatherItem.id} className="item">
                        <li><img src={iconUrl} alt="alt"/></li>
                        <li>{weatherItem.description}</li>
                    </ul>
                    );
                  })
                }

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
        <div>loading...
          <button
          type="button"
          onClick={this._onClick}
          style={{
              marginLeft: '.4rem',
              borderRadius: '.4rem',
              border: 'solid 1px #ccc',
              padding: '0.4rem 1rem',
              color: 'white',
              fontSize: '1rem',
              margin: '0 1rem',
              marginTop: '13px',
              cursor: 'pointer'}}>
          click me
        </button></div>
        )
    }

  }

}

