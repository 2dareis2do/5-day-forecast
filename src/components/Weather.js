import axios from 'axios';
import React from 'react';

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

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.data;
}

export default class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: [],
      list: []
     };

  }

  componentDidMount() {
    this.importState = this.importState.bind(this);
    let weatherURL = this.props.weatherURL;
    axios
      .get(weatherURL)
        .then(checkStatus)
        .then(parseJSON)
        .then(this.importState)
        .catch(function(err) {
          console.log(err);
        });
  }

  componentWillMount() {

  }

  importState(item) {
    this.setState({city:item.city});
    this.setState({list:item.list});
  }

  render() {

    return (

      <div className="weather-container">

        <h1 className="title">5 day weather forecast: {this.state.city.name}, {this.state.city.country}</h1>

          {this.props.children}
          <div className="weather-items">

           {this.state.list.map(function(listItem) {
              return (
                <div key={listItem.dt} className="item" style={itemStyle} >

                <span>{listItem.dt_txt}</span>

                  {listItem.weather.map(function(weatherItem) {
                    var iconUrl = "http://openweathermap.org/img/w/" + weatherItem.icon + ".png";
                    return (
                      <ul style={ulStyle} key={weatherItem.id} className="item">
                        <li><img src={iconUrl} /></li>
                        <li>{weatherItem.description}</li>
                    </ul>
                    );
                  })}

                  <h3 className="temp">{listItem.main.temp}&#8451;</h3>

                </div>
              );
            })}

          </div>

      </div>

    );
  }

}

