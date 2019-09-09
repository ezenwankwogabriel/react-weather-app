import React, { Component } from 'react';
import HourlyWeatherItem from './HourlyWeatherItem';
import DateSeparator from './DateSeparator';
import { connect } from 'react-redux';

class WeatherByTheHour extends Component {

  render() {
    const items = this.props.JSON.hourly.data.map(item => {
      return (
        <>
          <div className='renderedHourlyWeather'>
            <DateSeparator
              key={item.time + 1}
              time={item.time}
              timezone={this.props.JSON.timezone}
            />
            <HourlyWeatherItem
              key={item.time}
              item={item}
              timezone={this.props.JSON.timezone}
              isTemperatureInC={this.props.tInC}
            />
          </div>

        </>

      );
    });
    return <div className='weatherByTheHour'>{items}</div>;
  }
}

const mapStateToProps = state => {
  return {
    tInc: state.tInc,
    JSON: state.JSON,
  }
}

export default connect(mapStateToProps)(WeatherByTheHour);
