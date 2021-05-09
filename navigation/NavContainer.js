import React, {useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import {NavigationActions} from 'react-navigation'

//import ShopNavigator from './ShopNavigator';

const NavContainer = props => {
    const navRef = useRef();
    const isAuth = useSelector(state=> !!state.authRed.idToken);
    useEffect(()=>{
        if(!isAuth){
            navRef.current.dispatch(NavigationActions.navigate({
                routeName: 'Auth',
            }));
        }else{
            
        }
    }, [isAuth]);
    return (
        <ShopNavigator ref={navRef} />
    );
};

export default NavContainer;