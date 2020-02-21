import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import { 
    MapWrapper
} from './google-map.styles';

const mapStyles = {
    width: '100px',
    height: '100px'
  };

export class GoogleMap extends Component {

  render() {
    return (
        <Map 
          google={this.props.google} 
          zoom={14}
          initialCenter = {{
            lat: 54.8985,
            lng: 23.9036
          }}
          scrollWheel = {true}
          
        >
  
          <Marker name={'Current location'} />
  
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>Kaunas</h1>
              </div>
          </InfoWindow>
        </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(GoogleMap);