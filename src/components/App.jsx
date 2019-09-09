import React, { Component } from 'react';
import axios from 'axios';
import Map from './Map';
import Header from './Header';
import Weather from './Weather';
import { connect } from 'react-redux';
import { update } from '../store/actions/weather';

class App extends Component {
  state = {
    API_KEY_GOOGLE: process.env.REACT_APP_API_KEY_GL,
  }

  componentDidMount() {
    this.getLocation();
  }
  
  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.reverseGeocoding(position.coords.latitude, position.coords.longitude);
      },
      err => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        this.getIP();
      },
      {
        timeout: 6000,
        enableHighAccuracy: false
      }
    );
  };

  getIP = async () => {
    const IP_URL_HOME = 'https://ipapi.co/json/';
    const json = await axios.get(IP_URL_HOME);
    this.props.onUpdateAddress({
      latitude: json.data.latitude,
      longitude: json.data.longitude,
      city: json.data.city,
      address: json.data.city,
      isAppLoaded: true
    })
  };

  reverseGeocoding = async (lat, lng) => {
    const GEO_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.state.API_KEY_GOOGLE}&latlng=${lat},${lng}`;
    const json = await axios.get(GEO_URL_HOME);
    if (json.data.status !== 'ZERO_RESULTS') {
      this.props.onUpdateAddress({
        city: json.data.results[0].address_components[2].short_name,
        address: json.data.results[0].formatted_address,
        latitude: lat,
        longitude: lng,
        isAppLoaded: true
      })
    } else {
      this.props.onUpdateAddress({
        city: "There's nothing here, please check where you click",
        address: "There's nothing here, please check where you click",
        latitude: lat,
        longitude: lng,
        isAppLoaded: true
      })
    }
  };

  handleAddressSearch = async name => {
    const GOOGLE_URL_HOME = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${this.API_KEY_GOOGLE}`;
    this.props.onUpdateAddress({
      city: 'Loading...',
      address: ''
    })
    const json = await axios.get(GOOGLE_URL_HOME);
    this.props.onUpdateAddress({
      latitude: json.data.results[0].geometry.location.lat,
      longitude: json.data.results[0].geometry.location.lng,
      city: json.data.results[0].formatted_address,
      address: json.data.results[0].formatted_address
    })
  };

  handleMapClick = event => {
    this.reverseGeocoding(event.latLng.lat(), event.latLng.lng());
  };

  render() {
    return (
     this.props.isAppLoaded ?
        <>
          <Header handleAddressSearch={this.handleAddressSearch} />
          <Weather />
          <Map
            handleMapClick={this.handleMapClick}
            handleAddressSearch={this.handleAddressSearch}
          />
        </> :
      <h2>Application is loading, please be patient...</h2>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAppLoaded: state.isAppLoaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateAddress: (add) => dispatch(update(add)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);