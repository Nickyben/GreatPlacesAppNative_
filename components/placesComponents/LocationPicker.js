import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../../constants/Colors';
import { ActivityIndicator } from 'react-native-paper';
import MapPreview from './MapPreview';


const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const markedLocation = props.navigation.getParam('markedLocation');
    const {onLocationPicked} = props;
    useEffect(()=>{
        if(markedLocation){
            setPickedLocation(markedLocation);
            onLocationPicked(markedLocation);
        }
    }, [markedLocation, onLocationPicked])


    const verifyPermissions = async () => {
        const permissionResult = await Permissions.askAsync(Permissions.LOCATION);//the result is stored auto  by the OS
        if (permissionResult.status !== 'granted') {
            Alert.alert('Permissions Not Granted', 'Your need to grant permissions to use this feature.', [
                { text: 'Okay' }
            ]);//we wont ask again, user will have to go to setting to grant it if they change their mind
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const permissionIsGranted = await verifyPermissions();
        if (!permissionIsGranted) {
            return;
        }
        try {
            setIsFetching(true);
            const fetchedLocation = await Location.getCurrentPositionAsync(//will now return an obj with info about taken image
                {
                    timeout: 5000,
                }
            );// this is an async operation because it depends on user's mobile data, phone setting etc
            console.log(fetchedLocation)
            setPickedLocation({
                lat: fetchedLocation.coords.latitude,
                lng: fetchedLocation.coords.longitude
            });
            props.onLocationPicked({
                lat: fetchedLocation.coords.latitude,
                lng: fetchedLocation.coords.longitude
            });

        } catch (err) {
            Alert.alert(
                'Failed To Get Location',
                'Please try again later or choose your location on the map',
                [{ text: 'Okay' }]
            )
        }
        setIsFetching(false);

    };

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    };
    return (//AIzaSyBD6bizZimqgDB_cBFEiErDzQBKiTC6THg
        //AIzaSyBC2Fq1cwTezyMkwXhcoQRZwqkaeEPIU5A
        <View style={styles.locationPicker}>
            <MapPreview
                style={styles.mapPreview}
                location={pickedLocation}
                onTouch={pickOnMapHandler}
            >
                {isFetching ? <ActivityIndicator color={Colors.primary} size={'large'} />

                    : <Text style={{ margin: 20 }}>No location picked yet.</Text>
                }
            </MapPreview>
            <View style={styles.actions}>
                <View style={styles.btn}>
                    <Button
                        title='Get User Location'
                        color={Colors.accent}
                        onPress={getLocationHandler}
                    />
                </View>
                <View style={styles.btn}>
                    <Button
                        title='Pick on Map'
                        color={Colors.accent}
                        onPress={pickOnMapHandler}
                    />
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    mapPreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderColor: Colors.primary,//'#ccc',
        borderWidth: 1,
        borderRadius: 5,
        //overflow: 'hidden',
        backgroundColor: '#eee',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    actions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    btn: {
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: 10,
    },



});

export default LocationPicker;

