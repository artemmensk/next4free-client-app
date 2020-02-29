import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';

export class MapScreen extends React.Component {
    state = {
        locationFound: false,
        key: 0,
        businesses: this.props.navigation.state.params.businesses,
        region: {
            krakow: {
                latitude: 50.058,
                longitude: 19.94,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04
            }
        }
    }

    componentDidMount() {
        this.getLocationAsync();
    }

    render() {
        return (
            <MapView
                region={this.initRegion()}
                style={StyleSheet.absoluteFillObject}>
                {this.state.businesses.map(business => (
                    <MapView.Marker
                        key={this.state.key++}
                        coordinate={business.latlng}
                        title={business.businessName}
                        description={business.currentCollectingProcess}
                        image={require('../assets/shop.png')}
                    />
                ))}
                {this.state.locationFound && < MapView.Marker
                    key={this.state.key++}
                    coordinate={this.state.location.coords}
                    title='You are here'
                    image={require('../assets/current-location.png')}
                />}
            </MapView>
        );
    }

    initRegion = () => {
        return this.state.locationFound ? this.extendCurrentLocation() : this.state.region.krakow
    }

    extendCurrentLocation = () => {
        this.state.location.coords.latitudeDelta = 0.09
        this.state.location.coords.longitudeDelta = 0.04
        return this.state.location.coords
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
                location,
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            locationFound: true,
            locationResult: JSON.stringify(location), location,
        });
    }
}