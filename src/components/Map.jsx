import React, { useContext } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { GlobalStoreContext } from "./Store";
import Header from './Header';
import Weather from './Weather';

export default function Map(props) {

  const API_KEY_GOOGLE =`${process.env.REACT_APP_API_KEY_GL}`;
  const [globalStore] = useContext(GlobalStoreContext);

  const MyMap = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={7}
      onClick={props.onMapClick}
      defaultCenter={{lat: globalStore.latitude, lng: globalStore.longitude}}
      center={{lat: globalStore.latitude, lng: globalStore.longitude}}
    >
      <Marker
        position={{lat: globalStore.latitude, lng: globalStore.longitude}}
      />
    </GoogleMap>
  ));

  return (
    <>
      <Header handleAddressSearch={props.handleAddressSearch} />
      <Weather />
      <MyMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY_GOOGLE}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={ <div style={{ height: `100%` }} /> }
        containerElement={ <div style={{ height: `97vh` }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }
        latitude={globalStore.latitude}
        longitude={globalStore.longitude}
        onMapClick={props.handleMapClick}
      />
    </>
  );
}