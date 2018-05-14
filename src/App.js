import React, { Component } from 'react';
import Layout from './components/Layout.js'
import Weather from './components/Weather.js'
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ACME Weather Widget</h1>
        </header>
        <section className="main">
          <Layout>
            <Weather weatherURL='https://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=metric&appid=7a9a047cd79788f2b905a34f1645d168'/>
          </Layout>
        </section>
      </div>
    );
  }
}
