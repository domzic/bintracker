import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const MAP_MARKER = 'M19 4h-3.5l-1-1h-5l-1 1H5v2h14zM6 7v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm8 7v4h-4v-4H8l4-4 4 4h-2z';

export class GoogleMap extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        level: undefined,
        initialCenter: {}
    };

    renderMarkers() {
        const { containers } = this.props;
        return containers.map((container, index) => (
            <Marker
                key={index}
                id={container.id}
                level={container.level}
                position={{ lat: container.latitude, lng: container.longitude }}
                icon={{
                    path: MAP_MARKER,
                    fillColor: container.level < 50 ? '#26E947' : container.level < 80 ? '#F0EA29' : '#F72D0D',
                    fillOpacity: 1,
                    anchor: { x: 24, y: 24 }
                }}
                onClick={this.onMarkerClick}
            />
        ));
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            level: props.level,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={12}
                initialCenter={{
                    lat: 54.906646,
                    lng: 23.955046
                }}
                onClick={this.onClose}
            >
                {this.renderMarkers()}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <span>
                      Level is: {this.state.level}
                      %
                    </span>
                </InfoWindow>
            </Map>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(GoogleMap);
