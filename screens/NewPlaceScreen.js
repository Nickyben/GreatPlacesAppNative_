import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ScrollView, Button, TextInput, StyleSheet } from 'react-native';

import * as placesAction from '../store/actions/placesAction';

import Card from '../components/UI/Card';
import Colors from '../constants/Colors';
import ImgPicker from '../components/placesComponents/ImgPicker';
import LocationPicker from '../components/placesComponents/LocationPicker';





const NewPlaceScreen = props => {
    const dispatch = useDispatch();
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [userLocation, setUserLocation ] = useState()

    const titleChangeHandler = (text) => {
        setTitleValue(text)
    };

    const imageTakenHandler = (imageUri) => {
        setSelectedImage(imageUri);
    };

    const locationPickedHandler = useCallback((location) => {
        setUserLocation(location);
    }, []);

    const savePlaceHandler = () => {
        dispatch(placesAction.addPlace(titleValue, selectedImage, userLocation));
        props.navigation.goBack();
    };
    return (
        <ScrollView contentContainerStyle={styles.scroll}>

            <View style={styles.form}>
                <Text style={styles.label}> Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={titleChangeHandler}
                />
                <ImgPicker onImageTaken={imageTakenHandler} />
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />
                <View style={styles.btn}>
                    <Button
                        title='Save Place'
                        color={Colors.primary}
                        value={titleValue}
                        onPress={savePlaceHandler}
                        fontFamily='OpenSansBold'
                    />
                </View>
            </View>

        </ScrollView>
    );
};


NewPlaceScreen.navigationOptions = navProps => {
    const addIcon = Platform.OS === 'android' ? 'md-add' : 'ios-add';
    return (
        { // headerTitle:'';


        }
    )
};

const styles = StyleSheet.create({
    scroll: {
        padding: 20,
    },
    form: {
        margin: 20,

    },
    label: {
        fontSize: 18,
        fontFamily: 'OpenSansBold',
        marginBottom: 15,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
    btn: {
        borderRadius: 8,
        overflow: 'hidden'
    }

});

export default NewPlaceScreen;