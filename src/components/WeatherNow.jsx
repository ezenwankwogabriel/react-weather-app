import React, { Component } from 'react';
import SunCycle from './SunCycle';
import { CtoF, getDate } from '../functions/functions';
import { connect } from 'react-redux';

class WeatherNow extends Component {
  render() {
    const icon_URL = `./images/icons/${this.props.JSON.currently.icon}.svg`;
    const timeNow = Math.round(new Date().getTime() / 1000);
    let temperatureNow,
      temperatureMin,
      temperatureMax;

    if (this.props.tInC) {
      temperatureNow = this.props.JSON.currently.temperature.toFixed(0);
      temperatureMin = this.props.JSON.daily.data[0].temperatureLow.toFixed(0);
      temperatureMax = this.props.JSON.daily.data[0].temperatureHigh.toFixed(0);
    } else {
      temperatureNow = CtoF(this.props.JSON.currently.temperature).toFixed(0);
      temperatureMin = CtoF(this.props.JSON.daily.data[0].temperatureLow).toFixed(0);
      temperatureMax = CtoF(this.props.JSON.daily.data[0].temperatureHigh).toFixed(0);
    }

    // We'll show precipitation if it's expected only; see final return statement
    const getPrecipitation = () => {
      if (this.props.JSON.currently.precipType) {
        return (
          <div>
            {this.props.JSON.currently.precipType}&nbsp;
          {(this.props.JSON.currently.precipProbability * 100).toFixed(0)}%
        </div>
        );
      }
    };

    const timeOptions = {
      timeZone: this.props.JSON.timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    return (
      <div className='todayWeather'>
        <SunCycle
          sunrise={this.props.JSON.daily.data[0].sunriseTime}
          sunset={this.props.JSON.daily.data[0].sunsetTime}
          timezone={this.props.JSON.timezone}
        />
        <div className='tToday'>{temperatureMin} / {temperatureMax}&deg;{this.props.tInC ? 'C' : 'F'}</div>
        <div>{this.props.JSON.currently.summary}</div>
        <div className='tNow'>{temperatureNow}&deg;{this.props.tInC ? 'C' : 'F'}
          <img src={icon_URL} alt={this.props.JSON.currently.icon} />
        </div>
        {getPrecipitation()} {/* showing precipitation only if it's expected */}
        <div className='timeNow'>{getDate(timeNow, timeOptions)}</div>
        <hr />
        <div>{this.props.JSON.hourly.summary}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    JSON: state.JSON,
    tInc: state.tInC
  }
}

export default connect(mapStateToProps)(WeatherNow);
