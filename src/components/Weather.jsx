import React, {  Component } from 'react';
import axios from 'axios';
import DailyWeather from './DailyWeather';
import WeatherByTheHour from './WeatherByTheHour';
import WeatherNow from './WeatherNow';
import { connect } from 'react-redux';
import { update } from '../store/actions/weather'
class Weather extends Component {
  state = {
    weatherLoaded: false,
    API_KEY_DARKSKY: process.env.REACT_APP_API_KEY_DS,
  }
  
  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather = async () => {
    const WEATHER_URL_HOME = `https://cors-anywhere.herokuapp.com/https://api.forecast.io/forecast/${this.state.API_KEY_DARKSKY}/${this.props.latitude},${this.props.longitude}?units=si&exclude=flags%2Cminutely`;
    this.setState({weatherLoaded: false});
    const res = await axios.get(WEATHER_URL_HOME);
    this.props.onUpdateAddress({JSON: res.data});
    this.setState({weatherLoaded: true});
  };

  handleTemperatureUnitChange = event => {
    event.preventDefault();
    this.props.onUpdateAddress({tInC: !this.props.tInC});
  };
  
  render() {
    return (
      this.state.weatherLoaded ?
        <div>
          <WeatherByTheHour />
          <div className='renderedWeather'>
            <button className='cOrF' onClick={this.TemperatureUnitChange}>
              Switch to &deg;{this.props.tInC ? 'F' : 'C'}
            </button>
            <div className='leftPanel'>
              <div className='cityName'>{this.props.city}</div>
              <WeatherNow />
            </div>
            <div className='rightPanel'>
              <DailyWeather date={1} />
              <DailyWeather date={2} />
              <DailyWeather date={3} />
              <div className='poweredBy'>Powered by <a href='http://darksky.net/poweredby/'>Dark
                Sky</a></div>
            </div>
          </div>
        </div> :
      <h3>Loading weather, please wait...</h3>
    );
  }

}

const mapStateToProps = state => {
  return {
    tInc: state.tInc,
    state,
    longitude: state.longitude,
    latitude: state.latitude,
    city: state.city,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateAddress: (add) => dispatch(update(add)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather)
