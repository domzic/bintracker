/* global google */
import React, { useState } from 'react';
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker,
    DirectionsRenderer,
    InfoWindow,
} from 'react-google-maps';
const MAP_MARKER =
    'M19 4h-3.5l-1-1h-5l-1 1H5v2h14zM6 7v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm8 7v4h-4v-4H8l4-4 4 4h-2z';

class MapDirectionsRenderer extends React.Component {
    state = {
        directions: null,
        error: null,
    };

    initDirections(userLocation) {
        let { places, travelMode } = this.props;
        places = places
            .filter(container => container.level > 80)
            .map(container => ({
                latitude: container.latitude,
                longitude: container.longitude,
            }));

        let waypoints = [];
        waypoints = places.map(container => ({
            location: { lat: container.latitude, lng: container.longitude },
            stopover: true,
        }));
        waypoints = [userLocation, ...waypoints, userLocation];

        const origin = waypoints.shift().location;
        const destination = waypoints.pop().location;
        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: travelMode,
                waypoints: waypoints,
                optimizeWaypoints: true,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    this.setState({ error: result });
                }
            }
        );
    }

    componentDidMount() {
        let userLocation = {};
        navigator.geolocation.getCurrentPosition(response => {
            userLocation = {
                stopover: true,
                location: {
                    lat: response.coords.latitude,
                    lng: response.coords.longitude,
                },
            };
            this.initDirections(userLocation);
        });
    }

    render() {
        if (this.state.error) {
            return <h1>{this.state.error}</h1>;
        }
        return (
            this.state.directions && (
                <DirectionsRenderer directions={this.state.directions} />
            )
        );
    }
}

const Map = withScriptjs(
    withGoogleMap(props => {
        const [state, setState] = useState({
            marker: {},
            showingInfoWindowMarkerId: '',
        });

        const onMarkerClick = index => {
            setState({
                ...state,
                showingInfoWindowMarkerId: index,
            });
        };

        const onMapClick = () => {
            setState({
                ...state,
                showingInfoWindowMarkerId: '',
            });
        };

        return (
            <GoogleMap
                defaultCenter={{ lat: 54.903617, lng: 23.913986 }}
                defaultZoom={10}
                onClick={onMapClick}
                defaultOptions={{
                    styles: [
                        {
                            elementType: 'geometry',
                            stylers: [{ color: '#242f3e' }],
                        },
                        {
                            elementType: 'labels.text.stroke',
                            stylers: [{ color: '#242f3e' }],
                        },
                        {
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#746855' }],
                        },
                        {
                            featureType: 'administrative.locality',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#d59563' }],
                        },
                        {
                            featureType: 'poi',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#d59563' }],
                        },
                        {
                            featureType: 'poi.park',
                            elementType: 'geometry',
                            stylers: [{ color: '#263c3f' }],
                        },
                        {
                            featureType: 'poi.park',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#6b9a76' }],
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry',
                            stylers: [{ color: '#38414e' }],
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry.stroke',
                            stylers: [{ color: '#212a37' }],
                        },
                        {
                            featureType: 'road',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#9ca5b3' }],
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'geometry',
                            stylers: [{ color: '#746855' }],
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'geometry.stroke',
                            stylers: [{ color: '#1f2835' }],
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#f3d19c' }],
                        },
                        {
                            featureType: 'transit',
                            elementType: 'geometry',
                            stylers: [{ color: '#2f3948' }],
                        },
                        {
                            featureType: 'transit.station',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#d59563' }],
                        },
                        {
                            featureType: 'water',
                            elementType: 'geometry',
                            stylers: [{ color: '#17263c' }],
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#515c6d' }],
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.stroke',
                            stylers: [{ color: '#17263c' }],
                        },
                    ],
                }}
            >
                {props.markers.map((marker, index) => {
                    const position = {
                        lat: marker.latitude,
                        lng: marker.longitude,
                    };

                    return (
                        <Marker
                            key={index}
                            id={marker.id}
                            position={position}
                            level={marker.level}
                            onClick={() => onMarkerClick(index)}
                            icon={{
                                path: MAP_MARKER,
                                fillColor:
                                    marker.level < 0
                                        ? '#E1E1E1'
                                        : marker.level < 50
                                        ? '#26E947'
                                        : marker.level < 80
                                        ? '#F0EA29'
                                        : '#F72D0D',
                                fillOpacity: 1,
                                anchor: { x: 24, y: 24 },
                            }}
                        >
                            {state.showingInfoWindowMarkerId === index && (
                                <InfoWindow>
                                    <div>
                                        <div>
                                            Device ID: {marker.ttnDeviceId}
                                        </div>
                                        <div>Level: {marker.level}%</div>
                                        <div>
                                            Times serviced:{' '}
                                            {marker.timesServiced}
                                        </div>
                                        <div>
                                            Position: {marker.latitude},{' '}
                                            {marker.longitude}
                                        </div>
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    );
                })}

                {props.mapView === 'directions' ? (
                    <MapDirectionsRenderer
                        places={props.markers}
                        travelMode={google.maps.TravelMode.DRIVING}
                    />
                ) : null}
            </GoogleMap>
        );
    })
);

export default Map;
