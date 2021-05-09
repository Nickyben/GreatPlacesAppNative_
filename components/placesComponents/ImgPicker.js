import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../../constants/Colors';


const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();
    const verifyPermissions = async () => {
        const permissionResult = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);//the result is stored auto  by the OS
        if (permissionResult.status !== 'granted') {
            Alert.alert('Permissions Not Granted', 'Your need to grant permissions to use this feature.', [
                { text: 'Okay' }
            ]);//we wont ask again, user will have to go to setting to grant it if they change their mind
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const permissionIsGranted = await verifyPermissions();
        if (!permissionIsGranted) {
            return;
        }
        const takenImage = await ImagePicker.launchCameraAsync(//will now return an obj with info about taken image
            {
                allowsEditing: true,
                aspect: [16, 9],//aspect ratio
                quality: 0.5,
            }
        );// this is an async operation because it depends on user

        // console.log(takenImage);
        setPickedImage(takenImage.uri);
        props.onImageTaken(takenImage.uri);
    };
    return (
        <View style={styles.imgPicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ?
                    (<Text style={{margin: 20}}>No image picked yet.</Text>)
                    : (<Image style={styles.image} source={{ uri: pickedImage }} />)}


            </View>
            <View style={styles.btn}>
                <Button
                    title='Take Image'
                    color={Colors.accent}
                    onPress={takeImageHandler}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    imgPicker: {
        alignItems: 'center',
        marginBottom: 15,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.primary,//'#ccc',
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#bbb',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    btn: {
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: 10,
    }

});

export default ImgPicker;

