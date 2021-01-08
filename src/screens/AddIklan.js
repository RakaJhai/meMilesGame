import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchableDropdown from 'react-native-searchable-dropdown';
import CheckBox from 'react-native-check-box'
import axios from 'axios';
import { HEADER_STYLE } from '../styles/header';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

const consWidth = Dimensions.get('window').width * 0.8;
const consHeigth = Dimensions.get('window').height * 0.90;

function AddIklan(props) {
    const [selectedGame, setSelectedGame] = useState('');
    const [checkWa, setCheckWA] = useState(false);
    const [checkPhone, setCheckPhone] = useState(false);
    const [popupIklan, setPopUpIklan] = useState(false);
    const [selectedDuration, setSelectedDuration] = useState('uk');
    const [budget, setBudget] = useState('');
    const [duration, setDuration] = useState([]);
    const[image, setImage] = useState(null)
    
    useEffect(() => {
        props.getLocation();
        props.getCategory();
        getDuration();
    }, [])

    const gamesName = props.listGame.map(item => ({name: item.gamesname, id: item.gamesid}))
    const durasiIklan = duration.map(item => ({name: item.duration + " hari", id: item.durationid}))
    const sliceBudget = budget.slice(3).split(".").join('');
    
    const submitIklan = () => {
        props.addIklan({
            gamesid: selectedGame.id,
            customerid: props.userId,
            budget: sliceBudget,
            duration: selectedDuration.id,
            showphone: checkPhone,
            showwhatsapp: checkWa,
            popupiklan:popupIklan
        })
    }

    const clearSubmit = () => {
        setSelectedGame('');
        setCheckWA(false),
        setCheckPhone(false),
        setPopUpIklan(false),
        setBudget('');
    }

   const getDuration = () => {
       axios.get('http://128.199.74.118/games/api/getduration.php')
       .then(res => {
            setDuration(res.data)
            console.log("Durasi", res.data);
       })
       .catch(err => {
           console.log('Catch error', err)
       })
   }
   
    const selectPict = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri)
        }
    };

    return (
        <SafeAreaView>
            <View style={{height: (consHeigth)}}>
                <View style={HEADER_STYLE}>
                    <Image style={{width: "100%", height: "100%", resizeMode: 'contain'}} source={require('../../icons/logobulet.png')}/>
                </View>
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    keyboardShouldPersistTaps='handled'
                    style={styles.container}
                >
                    {/* <SafeAreaView> */}
                    <View style={styles.itemView}>
                        <Text style={{fontSize: 20, textAlign: 'center', padding: 20, fontWeight: '700'}}>Pasang Iklan</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity 
                        style={styles.logoTokoView}
                        onPress={selectPict}>
                            <Image style={styles.logoImg} source={image && { uri: image }}/>
                            { image == null &&
                                <Text style={{fontSize: 24, color: '#fff', fontWeight: '900'}}>Upload Foto</Text>
                            }
                            
                        </TouchableOpacity>
                    </View>
                    {/* PROVINSI ITEM START */}
                    <View style={styles.itemViewText}>
                        <View style={{flex: 1, backgroundColor: 'white', padding: 15,}}>
                                <SearchableDropdown
                                    textInputProps={{height: 40, fontSize: 20}}
                                    onTextChange={(text) => console.log(text)}
                                    onItemSelect={(item) => {setSelectedGame(item)}}
                                    itemStyle={{
                                        paddingVertical: 10,
                                        borderColor: '#bbb',
                                        borderBottomWidth: 0.5,
                                    }}
                                    itemTextStyle={{
                                        color: '#000',
                                        fontSize: 18,
                                    }}
                                    itemsContainerStyle={{
                                        maxHeight: '100%',
                                        width: 300
                                    }}
                                    items={gamesName}
                                    defaultIndex={0}
                                    placeholder="Pilih Game"
                                    placeholderTextColor="#000"
                                    resetValue={false}
                                    underlineColorAndroid="transparent"
                                />
                        </View>
                    </View>
                    
                    <View style={styles.itemViewText}>
                        <View style={{padding: 15}}>
                            <SearchableDropdown
                                onTextChange={(text) => console.log(text)}
                                onItemSelect={(item) => {setSelectedDuration(item)}}
                                textInputProps={{height: 40, fontSize: 20}}
                                itemStyle={{
                                    paddingVertical: 10,
                                    borderColor: '#bbb',
                                    borderBottomWidth: 0.5,
                                }}
                                itemTextStyle={{
                                    color: '#000',
                                    fontSize: 18,
                                }}
                                itemsContainerStyle={{
                                    maxHeight: '100%',
                                    width: 300
                                }}
                                items={durasiIklan}
                                defaultIndex={0}
                                placeholder="Pilih Durasi"
                                placeholderTextColor="#000"
                                resetValue={false}
                                underlineColorAndroid="transparent"
                            />
                        </View> 
                    </View>
                    <View style={styles.itemView}>
                        <MaterialCommunityIcons name="pencil-outline" size={24} color="black" style={styles.textInputIcon} />
                        <NumberFormat
                            value={budget}
                            displayType={'text'}
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix={'Rp '}
                            renderText={(value) => (
                                <TextInput
                                placeholder="Set Budget"
                                style={styles.textInputJudul}
                                value={value}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    setBudget(text);
                                }}
                                />
                            )}                                  
                        />
                    </View>
                    <View>
                        <CheckBox
                            style={{padding: 10}}
                            onClick={()=> setCheckWA(!checkWa)}
                            isChecked={checkWa}
                            rightText={"Bisa dihubungi via whatsapp"}
                        />
                        <CheckBox
                            style={{padding: 10}}
                            onClick={()=> setCheckPhone(!checkPhone)}
                            isChecked={checkPhone}
                            rightText={"Bisa dihubungi via telephone"}
                        />
                         <CheckBox
                            style={{padding: 10}}
                            onClick={()=> setPopUpIklan(!popupIklan)}
                            isChecked={popupIklan}
                            rightText={"Centang Untuk Popup Iklan Anda"}
                        />
                    </View>
                    <View style={{marginVertical: 10}}>
                        <TouchableOpacity 
                            onPress={() => {console.log("Bisa"), 
                                submitIklan()
                                clearSubmit()
                            }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                    {/* </SafeAreaView> */}
                </ScrollView>
            </View>
        </SafeAreaView>
   
   );
}

const mapStateToProps = (state) => ({
    userId: state.auth.dataUser.id,
    listGame: state.gameList.list,
})

const mapStateDispatchToProps = (dispatch) => ({
  getLocation: () => dispatch({type: 'GET_PROVINCE'}),
  getCategory: () => dispatch({type: 'GET_CATEGORY'}),
  addIklan: (data) => dispatch({type: 'ADD_IKLAN', payload: data})
})

export default connect(mapStateToProps, mapStateDispatchToProps) (AddIklan);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    // marginVertical: 0,
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
  },
    logoTokoView:{
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#e6e6e6'
    },
    logoImg:{
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 100,
        position: 'absolute'
    },
});
