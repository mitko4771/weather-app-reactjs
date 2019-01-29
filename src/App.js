import React, { Component } from 'react';
import './css/Main.css'

import Title from './components/Title'
import Form from './components/Form'
import Weather from './components/Weather';

class App extends Component {
  state = {
    country: undefined,
    city: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;
    
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=0934535f0dd8aab6f588f5d24a91a516&units=metric`);
    const data = await api_call.json();
   
    city && country ? this.setState({
      country: data.sys.country,
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ''
    }) : 
    this.setState({
      country: undefined,
      city: undefined,
      temperature: undefined,
      humidity: undefined,
      description: undefined,
      error: 'Please fill the form.'
    })
    
  }

  render() {
    const data = {
      city: this.state.city,
      country: this.state.country,
      temperature: this.state.temperature,
      humidity: this.state.humidity,
      description: this.state.description,
      error: this.state.error
    }
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="title-container col col-md-4">
                  <Title />
                </div>
                <div className="form-container col col-md-8">
                  <Form getWeather={this.getWeather}/>
                  <Weather {...data}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
        