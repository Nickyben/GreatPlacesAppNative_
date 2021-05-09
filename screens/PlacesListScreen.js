import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import HeaderBtn from '../components/UI/HeaderBtn';
import PlaceItem from '../components/placesComponents/PlaceItem';
import * as placesActions from '../store/actions/placesAction';


const PlacesListScreen = props => {
    const places = useSelector(state => state.placesReduc.places);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(placesActions.loadPlaces())
    },[dispatch])
    return (
        <FlatList 
            keyExtractor={item => item.id}
            data={places}
            renderItem={itemData => (
                <PlaceItem
                    image={itemData.item.imageUri}
                    title={itemData.item.title}
                    address={itemData.item.address}
                    onSelect={() => {
                        props.navigation.navigate({
                            routeName: 'PlaceDetail', 
                            params: {
                                placeTitle: itemData.item.title,
                                placeId: itemData.item.id,
                            }
                        })
                    }} />
            )}
        />
    );
};

PlacesListScreen.navigationOptions = navProps => {
    const addIcon = Platform.OS === 'android' ? 'md-add' : 'ios-add';
    return (
        { // headerTitle:'';
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderBtn} >
                    <Item
                        title='Add Place'
                        iconName={addIcon}
                        onPress={
                            () => {
                                navProps.navigation.navigate(
                                    {
                                        routeName: 'NewPlace',
                                        params: {
                                        }
                                    }
                                )
                            }
                        }
                    />
                </HeaderButtons>
            )
        }
    )
};

const styles = StyleSheet.create({

});

export default PlacesListScreen;