import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';
import ENV from '../../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';


export const addPlace = (title, imageUri, location) => {
    //this url is for reverse geocoding https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
    return (
        async dispatch => {
            const fileName = imageUri.split('/').pop();//returns the filename itself eg: myImage.jpg
            const newImagePath = FileSystem.documentDirectory + fileName;// .documentDir returns the doc path

            //you can put this in the try and catch 
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=
            ${
                location.lat
                },${location.lng}&key=${ENV().googleApiKey}`);

            if (!response.ok) {
                throw new Error('Something went wrong in getting your address');
            }

            const respData = await response.json();
            if (!respData.results) {
                throw new Error('Hmmm, something is definitely wrong');
            }
            const userAddress = respData.results[0].formatted_address; //check out the obj returned by respData

            try {
                await FileSystem.moveAsync({ //moves the image to a new Dir
                    from: imageUri,
                    to: newImagePath
                });
                const dbResult = await insertPlace(//inserting into the sqlite db
                    title,
                    newImagePath,
                    userAddress,
                    location.lat,
                    location.lng
                );
                //console.log(dbResult);
                dispatch({
                    type: ADD_PLACE,
                    placeData: {
                        id: dbResult.insertId,
                        title: title,
                        imageUri: newImagePath, // no longer previous path ->imageUri
                        address: userAddress,
                        coords: {
                            lat: location.lat,
                            lng: location.lng
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                throw err;
            }


        });


};

export const loadPlaces = (title, imageUri) => {
    return (
        async dispatch => {
            try {
                const dbResult = await fetchPlaces();
                //console.log(dbResult);
                dispatch({
                    type: SET_PLACES,
                    places: dbResult.rows._array,
                });
            } catch (err) {
                throw err;
            }


        });


};