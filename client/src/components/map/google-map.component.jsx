/* global google */
import React, { useContext, useEffect, useState } from 'react';
import {
    DirectionsRenderer,
    GoogleMap,
    InfoWindow,
    Marker,
    withGoogleMap,
    withScriptjs,
} from 'react-google-maps';
import { Context } from '../../state/store';
import { Actions, Filter, MapView } from '../../state/constants';
import ContainerForm from '../container-form/container-form.component';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { InfoWindowButton, Alert } from './google-map.styles';
import moment from 'moment';
import alert from '../../assets/alert.svg';
import Fab from '@material-ui/core/Fab';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import Tooltip from '@material-ui/core/Tooltip';

const MAP_MARKER =
    'M19 4h-3.5l-1-1h-5l-1 1H5v2h14zM6 7v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm8 7v4h-4v-4H8l4-4 4 4h-2z';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        padding: theme.spacing(2, 4, 3),
        outline: 0,
    },
}));

const MapDirectionsRenderer = ({ places, travelMode }) => {
    const [state, dispatch] = useContext(Context);
    const [localState, setLocalState] = useState({
        directions: null,
        error: null,
    });

    useEffect(() => {
        let userWaypoint = {
            stopOver: true,
            location: state.userLocation,
        };
        initDirections(userWaypoint);
    }, []);

    const initDirections = userLocation => {
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
                    setLocalState({ ...localState, directions: result });
                } else {
                    setLocalState({ ...localState, error: result });
                }
            }
        );
    };

    return (
        <div>
            {localState.error ? (
                <h1>{localState.error}</h1>
            ) : localState.directions ? (
                <DirectionsRenderer directions={localState.directions} />
            ) : null}
        </div>
    );
};

const Map = withScriptjs(
    withGoogleMap(props => {
        const [state, dispatch] = useContext(Context);
        const { userLocation, activeMarker } = state;
        const [cursorPosition, setCursorPosition] = useState(null);

        const onMarkerClick = id => {
            dispatch({ type: Actions.SET_ACTIVE_MARKER, payload: id });
            setCursorPosition(null);
        };
        let _map;
        const [openModal, setOpenModal] = useState(false);

        const classes = useStyles();
        const getModalStyle = () => ({
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
        });
        const [modalStyle] = useState(getModalStyle);

        const handleModalClose = () => {
            setOpenModal(false);
            setCursorPosition(null);
        };

        const onMapClick = event => {
            setCursorPosition(null);
            dispatch({ type: Actions.SET_ACTIVE_MARKER, payload: '' });
        };

        const onMapRightClick = event => {
            setCursorPosition({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            });
        };

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={openModal}
                    onClose={handleModalClose}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <ContainerForm
                            lat={cursorPosition ? cursorPosition.lat : ''}
                            lng={cursorPosition ? cursorPosition.lng : ''}
                            closeModal={handleModalClose}
                        />
                    </div>
                </Modal>
                <GoogleMap
                    ref={it => (_map = it)}
                    tilt={0}
                    defaultCenter={
                        userLocation
                            ? { lat: userLocation.lat, lng: userLocation.lng }
                            : { lat: 54.903617, lng: 23.913986 }
                    }
                    defaultZoom={10}
                    onClick={onMapClick}
                    onRightClick={onMapRightClick}
                    defaultOptions={{
                        draggableCursor: 'crosshair',
                        mapTypeControl: false,
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
                    {cursorPosition && (
                        <Marker
                            key="add"
                            id="add"
                            position={cursorPosition}
                            icon={{
                                path: MAP_MARKER,
                                fillColor: 'rgba(255, 255, 255, 0.2)',
                                fillOpacity: 1,
                                anchor: { x: 16, y: 16 },
                            }}
                        >
                            <InfoWindow
                                onCloseClick={() => setCursorPosition(null)}
                            >
                                <InfoWindowButton
                                    onClick={() => setOpenModal(true)}
                                >
                                    Add container here
                                </InfoWindowButton>
                            </InfoWindow>
                        </Marker>
                    )}
                    {props.markers.map((marker, index) => {
                        const position = {
                            lat: marker.latitude,
                            lng: marker.longitude,
                        };

                        return (
                            <Marker
                                key={index}
                                id={marker._id}
                                position={position}
                                level={marker.level}
                                onClick={() => onMarkerClick(marker._id)}
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
                                {activeMarker === marker._id && (
                                    <InfoWindow className="test">
                                        <div>
                                            <div>
                                                Device ID: {marker.ttnDeviceId}
                                            </div>
                                            <div>Level: {marker.level}%</div>
                                            <div>
                                                Times serviced:{' '}
                                                {marker.timesServiced}
                                            </div>
                                            <div>Address: {marker.address}</div>
                                            <div>
                                                Height:{' '}
                                                {(marker.height / 100).toFixed(
                                                    1
                                                )}{' '}
                                                m
                                            </div>
                                            <div>
                                                Last updated:{' '}
                                                {moment(
                                                    marker.lastUpdate
                                                ).format('MMM DD, ddd HH:mm')}
                                                {moment(new Date()).diff(
                                                    moment(marker.lastUpdate),
                                                    'hours'
                                                ) > 24 && (
                                                    <span>
                                                        <Tooltip
                                                            placement='top'
                                                            color='yellow'
                                                            title="The device haven't send any data for one day"
                                                            aria-label="device"
                                                        >
                                                            <Alert
                                                                alt="alert"
                                                                src={alert}
                                                            />
                                                        </Tooltip>
                                                    </span>
                                                )}
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
            </div>
        );
    })
);

export default Map;
