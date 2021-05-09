import {Platform } from 'react-native';

//for android
let primary = '#229977'; 
let accent = '#22aa88';
let switchColor = primary
let switchColorWhite = 'white';
let switchAccent = accent;
let switchWhiteAccent = '#d5d5d5';


//for ios
if(Platform.OS === 'ios'){
    switchColor = 'white'
    switchColorWhite= primary;
    switchAccent = '#d5d5d5'
    switchWhiteAccent = accent;
}




export default {
   // primary:'#227799'
    accent: '#22aa88',
    primary: '#229977',
    switchPrimary: switchColor,
    switchWhite : switchColorWhite,
    switchAccent: switchAccent,
    switchWhiteAccent: switchWhiteAccent,
};