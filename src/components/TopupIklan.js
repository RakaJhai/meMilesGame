import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity,SafeAreaView ,Dimensions} from 'react-native';
import { HEADER_STYLE } from '../styles/header';
const consHeigth = Dimensions.get('window').height * 0.90;
function TopupIklanScreen(){
    return(
      <View style={styles.content2}>
        <Text style={styles.contentText}>Top Up Screen</Text>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    content:{
      justifyContent: 'flex-start',
      borderRadius:10,
      width:'95%',
      height:100, 
      backgroundColor:'#1e65a7'
    },
    content2:{
        justifyContent: 'center',
        borderRadius:10,
        width:'97%',
        marginLeft:5,
        
        height:100, 
        backgroundColor:'#1e65a7'
      },
    contentText:{
      paddingTop:1,
      paddingLeft:10,
      fontSize:25,
      fontWeight:'bold',
      color:'white'
    },
    slotIklanContainer:{
      width:'48%',
      elevation:10,
      backgroundColor:'#ddd',
      borderWidth:1,
      borderColor:'#18396f',  
      justifyContent:'space-around',
      flexDirection:"row",
      alignItems:'center',
      borderRadius:10,
      padding: 10
    },
    logoImg:{
      justifyContent:'center',
      resizeMode:'stretch',
      width:45,height:45
    },
    iklanText:{
      paddingLeft:10, 
      paddingTop:2, 
      color:'black',
      fontSize:19,
      fontWeight:'400'
    },
    image:{
      width: '100%',
      height: 200,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      resizeMode: 'contain'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    },
    profileImg:{
      width: 40,
      height: 40,
      borderRadius: 50,
      marginRight: 10
    }
  });
export default TopupIklanScreen;