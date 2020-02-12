import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import { 
    MapWrapper
} from './map.styles';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


class Map extends Component {
  static defaultProps = {
    center: {
      lat: 54.8985,
      lng: 23.9036
    },
    zoom: 11
  };

  render() {
    return (
      <MapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
        </MapWrapper>
    );
  }
}

export default Map;