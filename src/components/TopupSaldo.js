import React, { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity,TextInput, SafeAreaView ,Dimensions} from 'react-native';
import { HEADER_STYLE } from '../styles/header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

const consWidth = Dimensions.get('window').width * 0.8;
const consHeigth = Dimensions.get('window').height * 0.90;
    
function TopupScreen(props){
    const [amount, setAmount] = useState("Rp 0")

    const amountSlice = amount.slice(3).split(".").join('');

    console.log( "amount slice", amountSlice)
    const submitTopUp = () => {
      props.addTopUp({
          customerid: props.userId,
          budget: amountSlice,
      })
    }

    return(
        <SafeAreaView>
        <View style={{height: (consHeigth)}}>
            <View style={styles.container}>
                <View style={styles.itemView}>
                    <Text style={{fontSize: 20, textAlign: 'center', padding: 20, fontWeight: '700'}}>Top Up Saldo</Text>
                </View>

                {/* PROVINSI ITEM START */}
                
                <View style={styles.itemView}>
                    <MaterialCommunityIcons name="pencil-outline" size={24} color="black" style={styles.textInputIcon} />
                    <NumberFormat
                        value={amount}
                        displayType={'text'}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix={'Rp '}
                        renderText={(value) => (
                            <TextInput
                            placeholder="Amount Topup"
                            style={styles.textInputJudul}
                            value={value}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setAmount(text);
                            }}
                            />
                        )}                                  
                    />
                </View>
                <View style={{marginVertical: 10}}>
                    <TouchableOpacity 
                        onPress={() => {console.log("Bisa"), submitTopUp()}}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>

    )
}

const mapStateToProps = (state) => ({
  userId: state.auth.dataUser.id,

  listGame: state.gameList,
})

const mapStateDispatchToProps = (dispatch) => ({
  addTopUp: (data) => dispatch({type: 'ADD_SALDO', payload: data})
})

export default connect(mapStateToProps, mapStateDispatchToProps) (TopupScreen);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
      marginVertical: 20,
      backgroundColor: '#fff',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
  
      elevation: 8,
    },
    itemViewText:{
      borderBottomWidth: 0.5,
      borderColor: '#000',
      flexDirection: 'row',
      alignItems: 'center'
    },   
    itemView:{
      borderBottomWidth: 0.5,
      borderColor: '#000',
      flexDirection: 'row',
      alignItems: 'center'
    },    
    containerActive: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: '#fff',
    },
    titleStyle: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 10,
    },
    textInput: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#000',
      marginVertical: 5,
      padding: 10,
      marginHorizontal: 10
    },
    textInputJudul: {
      marginVertical: 5,
      padding: 10,
      height: 60
    },
    textInputIcon:{
        paddingHorizontal: 15, 
        borderRightWidth: 1, 
        borderRightColor: '#000'
  },
    textInputHarga: {
      marginVertical: 5,
      padding: 10,
      height: 60
    },
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
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      width: consWidth
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // marginTop: 22
      // backgroundColor: '#000'
    },
  });

