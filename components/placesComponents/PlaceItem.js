import React from 'react';
import {
    Platform, View, Text, StyleSheet, Image,
    Button, TouchableOpacity, TouchableNativeFeedback
} from 'react-native';

import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const Touch = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const PlaceItem = props => {
    return (

        <TouchableOpacity onPress={props.onSelect} style={styles.placeItem} >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: props.image }} style={styles.image} />
                </View>
                <View style={styles.itemDetail}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.address}>{props.address}</Text>
                </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    placeItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
       
    },
   
    imageContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderColor: Colors.primary,
        borderWidth: 1,
       overflow: 'hidden'
    },
    image: {
        backgroundColor: '#ccc',
        width: '100%',
        height: '100%'
    },
    itemDetail: {
        marginLeft: 25,
        width: 250,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title: {
        fontFamily: 'OpenSansBold',
        fontSize: 18,
        marginVertical: 2,
        color: '#000',
    },
    address: {
        fontFamily: 'OpenSansRegular',
        fontSize: 16,
        color: '#666',
    },



});
export default PlaceItem;