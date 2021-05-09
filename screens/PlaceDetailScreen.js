import React from 'react';
import { View, Text, StyleSheet, ScrollView,Image } from 'react-native';
import { useSelector } from 'react-redux';

import MapPreview from '../components/placesComponents/MapPreview';
import Colors from '../constants/Colors';



const PlaceDetailScreen = props => {
    const placeId = props.navigation.getParam('placeId');
    const selectedPlace = useSelector(state => state.placesReduc.places.find((place) => place.id === placeId));
    const locationSelected = {
        lat: selectedPlace.lat,
        lng: selectedPlace.lng
    }
    const showMapHandler=()=>{
        props.navigation.navigate({
            routeName:'Map',
            params:{
                isReadOnly: true,
                initialLocation:locationSelected,
            }
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}><Text style={styles.address}>{selectedPlace.address}</Text></View>
                <MapPreview
                    style={styles.mapPreview}
                    location={locationSelected}
                    onTouch={showMapHandler}
                >
                </MapPreview>
            </View>
        </ScrollView>
    );
};

PlaceDetailScreen.navigationOptions = navData => {

    const addIcon = Platform.OS === 'android' ? 'md-add' : 'ios-add';
    return (
        {
            headerTitle: navData.navigation.getParam('placeTitle'),

        }
    )
};

const styles = StyleSheet.create({
    scroll:{
        alignItems: 'center',
    },
    image:{
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ddd',
    },
    locationContainer:{
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    addressContainer:{
        padding: 20
    },
    address:{
        color: Colors.primary,
        textAlign: 'center',

    },
    mapPreview:{
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,

    }

});

export default PlaceDetailScreen;