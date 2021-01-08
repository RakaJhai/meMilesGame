import React from 'react';
import {Image, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RiwayatScreen from '../screens/RiwayatScreen';
import SaldoScreen from '../screens/SaldoScreen';
import AddIklan from '../screens/AddIklan';

const Tab = createBottomTabNavigator();

export default function MainNav(){
    return(
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconProfile;
                    if (route.name === 'Home') {
                        iconProfile = require('../../icons/Home.png');
                        return (
                        <Image
                            style={styles.img}
                            color={color}
                            source={iconProfile}
                        />)
                    } 
                    else if (route.name === 'Saldo') {
                        iconProfile = require('../../icons/saldo.png');
                        return (
                        <Image
                            style={styles.img}
                            color={color}
                            source={iconProfile}
                        />
                        );
                    }else if (route.name === 'Riwayat') {
                        iconProfile = require('../../icons/riwayat.png');
                        return (
                        <Image
                            style={styles.img}
                            color={color}
                            source={iconProfile}
                        />
                        );
                    }else if (route.name === 'Iklan') {
                        iconProfile = require('../../icons/top-up.png');
                        return (
                        <Image
                            style={styles.img}
                            color={color}
                            source={iconProfile}
                        />
                        );
                    }
                    else if (route.name === 'Profile') {
                        iconProfile = require('../../icons/account.png');
                        return (
                        <Image
                            style={styles.img}
                            color={color}
                            source={iconProfile}
                        />
                        );
                    }
                },
            })}
            tabBarOptions={{
                activeTintColor: 'red',
                inactiveTintColor: 'gray',
            }}
            // tabBarOptions={{showLabel: false}}
        >
            <Tab.Screen name='Home' component={MainScreen}/>
            <Tab.Screen name='Riwayat' component={RiwayatScreen}/>
            <Tab.Screen name='Iklan' component={AddIklan}/>
            <Tab.Screen name='Saldo' component={SaldoScreen}/>
            <Tab.Screen name='Profile' component={ProfileScreen}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    img:{
        width: 30, 
        height: 30, 
        borderRadius: 50,
    }
})