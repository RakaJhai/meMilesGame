import React, {useCallback, useState} from 'react';
import { StyleSheet, Text, ScrollView, RefreshControl, View, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { HEADER_STYLE } from '../styles/header';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

const consWidth = Dimensions.get('window').width * 0.8;
const consHeigth = Dimensions.get('window').height * 0.90;

const timeWait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

function ProfileScreen(props){
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        timeWait(2000).then(() => setRefreshing(false));
    }, []);

    return(
        <SafeAreaView>
            <View style={{height: (consHeigth)}}>
                <View style={HEADER_STYLE}>
                    <Image style={{width: "100%", height: "100%", resizeMode: 'contain'}} source={require('../../icons/logobulet.png')}/>
                </View>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                    <View style={{marginHorizontal: 10}}>
                        <View style={styles.menuLine}>
                            <Text style={styles.menuLineText}>{props.nama}</Text>
                            <Text style={styles.menuLineText1}>{props.phone}</Text>
                            {/* <TouchableOpacity 
                                style={styles.menuLineIcon}
                                onPress={() => props.navigation.navigate('RegistVendor')}
                            >
                                <FontAwesome name="sign-in" size={24} color="black" />
                            </TouchableOpacity> */}
                        </View>
                        
                        <TouchableOpacity 
                            style={styles.menuLine}
                            onPress={() => props.navigation.navigate('RegistVendor')}
                        >
                            <Text style={styles.menuLineText}>Become as Vendor</Text>
                            <FontAwesome name="sign-in" size={24} style={styles.menuLineIcon} color="black" />
                        </TouchableOpacity>
                                                    
                        <TouchableOpacity 
                            style={styles.menuLine}
                            onPress={() => props.logout()}
                        >
                            <Text style={styles.menuLineText}>Log out</Text>
                            <MaterialCommunityIcons name="logout-variant" size={24} style={styles.menuLineIcon} color="black" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    nama: state.auth.dataUser.profile.name,
    phone: state.auth.dataUser.profile.phone,
})

const mapStateDispatchToProps = (dispatch) => ({
    logout: () => dispatch({type: 'LOGOUT'})
})
export default connect(mapStateToProps, mapStateDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#7971EA',
        marginHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        padding: 10,
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    menuLine:{
        flexDirection: 'row', 
        alignItems: 'center', 
        borderBottomWidth: 0.5, 
        borderBottomColor: 'grey', 
        paddingVertical: 10,
        marginHorizontal: 10
    },
    menuLineText:{
        fontSize: 20
    },
    menuLineText1:{
        fontSize: 20,
        flex: 1, 
        position: 'absolute', 
        right: 10
    },
    menuLineIcon:{
        flex: 1, 
        position: 'absolute', 
        right: 10
    }
})