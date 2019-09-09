import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { connect } from 'react-redux';


class Map extends Component {
  state = {
    API_KEY_GOOGLE: process.env.REACT_APP_API_KEY_GL,
    
  }

  render() {
    const MyMap = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={7}
        onClick={this.props.onMapClick}
        defaultCenter={{lat: this.props.latitude, lng: this.props.longitude}}
        center={{lat: this.props.latitude, lng: this.props.longitude}}
      >
        <Marker
          position={{lat: this.props.latitude, lng: this.props.longitude}}
        />
      </GoogleMap>
    ));
    const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${this.state.API_KEY_GOOGLE}`;
    return (
      <MyMap
        googleMapURL={googleMapURL}
        loadingElement={ <div style={{ height: `100%` }} /> }
        containerElement={ <div style={{ height: `97vh` }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }
        latitude={this.props.latitude}
        longitude={this.props.longitude}
        onMapClick={this.props.handleMapClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    latitude: state.latitude,
    longitude: state.longitude,
  }
}

export default connect(mapStateToProps)(Map)