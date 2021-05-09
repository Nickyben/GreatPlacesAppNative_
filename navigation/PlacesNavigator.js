import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';

import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';

import Colors from '../constants/Colors';



const defaultNavOptions = {
    headerTitle: 'Great Places',
    headerTitleStyle: {
        fontFamily: 'OpenSansBold',
    },

    headerBackTitleStyle: {//for the back button text...seen in ios
        fontFamily: 'OpenSansRegular',
    },
    headerStyle: {
        backgroundColor: Colors.switchPrimary,
    },
    headerTintColor: Colors.switchWhite,
    headerTitleAlign: 'center',

};

const PlacesNav = createStackNavigator(
    {
        Places: {
            screen: PlacesListScreen,
            navigationOptions: {
                headerTitle: 'All Places',

            },
        },

        PlaceDetail: {
            screen: PlaceDetailScreen,
            navigationOptions: {

            },
        },

        NewPlace: {
            screen: NewPlaceScreen,
            navigationOptions: {
                headerTitle: 'New Place'
            },
        },

        Map: {
            screen: MapScreen,
            navigationOptions: {
                headerTitle: 'Map'
            },
        },
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);


// const OrdersStackNavigator = createStackNavigator(
//     {
//         Orders: {
//             screen: OrdersScreen,
//             navigationOptions: {
//                 headerTitle: 'Your Orders'
//             }
//         }
//     },
//     {
//         defaultNavigationOptions: defaultNavOptions
//     }
// );

// const AdminStackNavigator = createStackNavigator(
//     {
//         UserProducts: {
//             screen: UserProductsScreen,
//             navigationOptions: {
//                 headerTitle: 'Your Products'
//             }
//         },
//         EditProduct: {
//             screen: EditProductScreen,
//             navigationOptions: {
//                 //headerTitle: 'Edit Product'
//             }
//         }
//     },
//     {
//         defaultNavigationOptions: defaultNavOptions
//     }
// );

// const AuthNavigator = createStackNavigator({
//     Authentication: {
//         screen: AuthScreen,
//         navigationOptions: {
//             headerTitle: 'Log In'
//         }
//     }
// },
//     {
//         defaultNavigationOptions: defaultNavOptions,
//     }
// );

// const ShopDrawerNavigator = createDrawerNavigator(
//     {
//         ProductsStack: {
//             screen: ProductsStackNavigator,
//             navigationOptions: {//can also be set in the 2nd arg of this stack' s create func
//                 drawerLabel: 'Products',
//                 drawerIcon: drawerConfig => (<Ionicons
//                     name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//                     size={23}
//                     color={drawerConfig.tintColor}
//                 />)

//             },
//         },

//         OrdersStack: {//this stack is at tab level !!!!
//             screen: OrdersStackNavigator,
//             navigationOptions: {//can also be set in the 2nd arg of this stack' s create func
//                 drawerLabel: 'Orders',
//                 drawerIcon: drawerConfig => (<Ionicons
//                     name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//                     size={23}
//                     color={drawerConfig.tintColor}
//                 />)
//             },
//         },

//         UserStack: {//this stack is at tab level !!!!
//             screen: AdminStackNavigator,
//             navigationOptions: {//can also be set in the 2nd arg of this stack' s create func
//                 drawerLabel: 'Admin',
//                 drawerIcon: drawerConfig => (<Ionicons
//                     name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//                     size={23}
//                     color={drawerConfig.tintColor}
//                 />)
//             },
//         }


//     },
//     {
//         drawerBackgroundColor: '#fff',
//         drawerPosition: 'left',
//         drawerType: 'front',
//         drawerLabel: 'Menu',
//         contentOptions: {

//             activeTintColor: Colors.primary,
//             activeBackgroundColor: '#f2f2f2',
//             inactiveBackgroundColor: '#fafafa',
//             inactiveTintColor: '#444',
//             labelStyle: {
//                 //fontFamily: 'OpenSansBold',
//                 fontSize: 18,
//                 alignItems: 'center',
//             },

//         },
//         contentComponent: (props) => {
//             const dispatch = useDispatch();
//             return (
//                 <View style={{
//                     flex: 1, paddingTop: 20,
//                 }}>
//                     <SafeAreaView
//                         forceInset={{ top: 'always', horizontal: 'never' }}
//                     ><DrawerItems {...props} />
//                         <Button
//                             title='Logout'
//                             color={Colors.primary}
//                             onPress={() => {
//                                 dispatch(authActions.logout());
//                                 //props.navigation.navigate('Auth')//already handled by the renderer(NavContainer) of the ShopNavigator @ app.js
//                             }}
//                         />

//                     </SafeAreaView>
//                 </View>
//             );
//         },
//     }
// );



// const MainNavigator = createSwitchNavigator({
//     Startup: {
//         screen: StartupScreen,
//     },
//     Auth: {
//         screen: AuthNavigator,
//     },
//     Shop: {
//         screen: ShopDrawerNavigator
//     }
// });

export default createAppContainer(PlacesNav);