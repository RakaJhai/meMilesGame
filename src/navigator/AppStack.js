import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../components/DetailsScreen';
import GamePlay from '../components/GamePlay';
import MainNav from '../navigator/MainNav';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen'
import RegisterVendor from '../components/RegisterVendor';
import TopupScreen from '../components/TopupSaldo';
import TopupIklanScreen from '../components/TopupIklan';
import VendorDetail from '../components/VendorDetail';

import { connect } from 'react-redux';

const Stack = createStackNavigator();

function AppStack(props){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                { props.sudahLogin ?
                    <>
                        <Stack.Screen options={{ headerShown: false }} name='MainNav' component={MainNav}/>
                        <Stack.Screen options={{ title: 'MeMiles Games', headerShown: true }} name='MainScreen' component={MainScreen}/>
                        <Stack.Screen options={{ title: 'Games Details', headerBackTitleVisible: false }} name='Details' component={DetailsScreen}/>
                        <Stack.Screen options={{ title: 'MeMiles Games', headerBackTitleVisible: false}}  name='PlayGame' component={GamePlay}/>
                        <Stack.Screen options={{ title: 'Register Vendor', headerBackTitleVisible: false}} name='RegistVendor' component={RegisterVendor} />
                        <Stack.Screen options={{ title: 'Topup Saldo', headerBackTitleVisible: false}} name='TopUpSaldo' component={TopupScreen} />
                        <Stack.Screen options={{ title: 'Topup Iklan', headerBackTitleVisible: false}} name='TopUpIklan' component={TopupIklanScreen} />     
                        <Stack.Screen options={{ title: 'Detail Vendor', headerShown: true}} name='DetailVendor' component={VendorDetail} />               
                    </>
                :
                    <>
                        <Stack.Screen options={{ title: 'Login',  headerShown: false }} name='Login' component={Login}/>
                        <Stack.Screen options={{ title: 'Login' }} name='Register' component={Register}/>
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = (state) => ({
    sudahLogin: state.auth.isLoggedIn,
})

const mapStateDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapStateDispatchToProps)(AppStack)