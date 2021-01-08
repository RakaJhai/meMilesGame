import React from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons'; 
import { connect } from 'react-redux';

// function LoadingIndicatorView() {
//     return <ActivityIndicator color='#009b88' size='large' />
// }
import {useNetInfo} from "@react-native-community/netinfo";

function GamePlay({route, navigation, userId}){
    const dataParam = route.params
    console.log("play game", userId)
    // const netInfo = useNetInfo();

    // if(netInfo.isConnected == true){
    //     return (
    //     <WebView 
    //     source={{uri: dataParam.gameslink + '?customerid=' + userId + '&gameid=' + dataParam.gamesid}}
    //     // renderLoading={LoadingIndicatorView}
    //     // startInLoadingState={true}
    //     />
    //     )
    // }else{
    //     return alert('Check Your connection')
    // }
    return(
        <WebView 
            source={{uri: dataParam.gameslink + '?customerid=' + userId + '&gameid=' + dataParam.gamesid}}
        />
    )
}

const mapStateToProps = (state) => ({
    userId: state.auth.dataUser.id,
})
  
const mapStateDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapStateDispatchToProps)(GamePlay)

const styles = StyleSheet.create({
    closeGame:{
        position: "absolute",
        top: 25,
        left: 5,
        zIndex: 1
    }
})