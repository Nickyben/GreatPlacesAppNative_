import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';


const MapScreen = props => {
    const initialLocation = props.navigation.getParam('initialLocation')
    const isReadOnly = props.navigation.getParam('isReadOnly')
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);


    const mapRegion = {//where the map initially focuses or starts from
        latitude: initialLocation? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        
        latitudeDelta: 0.0922,//these should also be a function of the initialLocation if defined
        longitudeDelta: 0.0421,
    };
    const selectLocationHandler = (event) => {
        if(isReadOnly){
            return;
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        });
    };

    const saveLocationHandler = useCallback(()=>{
        if(!selectedLocation){
            Alert.alert('No Location Selected', 'Please choose a location to save',[{text: 'Okay'}]);
            return;
        }
        props.navigation.navigate({
            routeName:'NewPlace',
            params: {
               markedLocation: selectedLocation,
            }
        });
    }, [selectedLocation]);

    useEffect(()=>{
        props.navigation.setParams({saveLocation: saveLocationHandler})
    }, [saveLocationHandler])

    let markerCoordinate;
    if (selectedLocation) {
        markerCoordinate = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
        }
    }

    return (
        <MapView
            style={styles.map}
            region={mapRegion}
            onPress={selectLocationHandler}
        >
            {
                markerCoordinate &&
                <Marker
                    title='Picked Location'
                    coordinate={markerCoordinate}
                ></Marker>
            }

        </MapView>
    );
};

MapScreen.navigationOptions = navData => {
    const isReadOnly = navData.navigation.getParam('isReadOnly');
    const saveFunc = navData.navigation.getParam('saveLocation');
    if(isReadOnly){
        return;
    }
    return (
        {
            headerRight: () => (
                <TouchableOpacity
                    style={styles.headerBtnTouch}
                    onPress={saveFunc}>
                    <Text style={styles.headerBtnText}>Save</Text>
                </TouchableOpacity>
            )
        }
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    headerBtnTouch: {
        marginHorizontal: 20
    },
    headerBtnText: {
        fontFamily: 'OpenSansBold',
        fontSize: 16,
        color: Colors.switchWhite,
    }
});

export default MapScreen;