import React, {Component} from 'react';
import { CtoF, getDate } from "../functions/functions";
import { connect } from 'react-redux';

class DailyWeather extends Component {

  render() {
    let { icon, time, temperatureLow, temperatureHigh, summary } = this.props.JSON.daily.data[this.props.date];
    const icon_URL = `./images/icons/${icon}.svg`;
    // Calculating temperature in Fahrenheit
    if (!this.props.tInC) {
      temperatureLow = CtoF(temperatureLow);
      temperatureHigh = CtoF(temperatureHigh);
    }
  
    const dateOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: this.props.JSON.timezone
    };
  
    return (
      <div className='dailyWeather'>
        <div>
          <div className='icon'>
            <img src={icon_URL} alt='icon'/>
          </div>
          <div className='date'>
            {getDate(time, dateOptions)}
          </div>
          <div className='tToday'>
            {temperatureLow.toFixed(0)}&deg;
            /&nbsp;
            {temperatureHigh.toFixed(0)}&deg;
            {this.props.tInC ? 'C' : 'F'}
          </div>
          <div className="forecastSummary">{summary}</div>
          <hr/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tInc: state.tInc,
    JSON: state.JSON,

  }
}

export default connect(mapStateToProps)(DailyWeather);
