import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Dimensions,
    Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchableDropdown from 'react-native-searchable-dropdown';
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons'; 
import { HEADER_STYLE } from '../styles/header';
import { connect } from 'react-redux';

const consWidth = Dimensions.get('window').width * 0.8;
const consHeigth = Dimensions.get('window').height * 0.90;

function RegisterVendor(props){
    const[image, setImage] = useState(null)
    const[nama, setNama] = useState('');
    const[category, setCategory] = useState([]);
    const[selectedCategory, setSelectedCategory] = useState('')
    const[deskripsi, setDeskripsi] = useState('');
    const[phone, setPhone] = useState('');
    const[imagePict, setImagePict] = useState('');
    const[alamat, setAlamat] = useState('');
    const[email, setEmail] = useState('');
    const[fax, setFax] = useState('');
    const[message, setMessage] = useState('')
    const[selectedProvinsi, setSelectedProvinsi] = useState('');
    const[selectedKota, setSelectedKota] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalKotaVisible, setModalKotaVisible] = useState(false);

    const dataKotaFilter =  props.dataKota.filter(item => item.m_province_id == selectedProvinsi.id )

    useEffect(() => {
        getCategoryVendor();
    }, [])
    console.log('Category Vendor', category);

    const getCategoryVendor = () =>{
        axios.get('http://128.199.74.118/games/api/getcategoryvendor.php')
        .then(res => {
            const mappingCategory = res.data.map(item => ({
                name: item.name, id: item.id
            }))
            setCategory(mappingCategory)
        }).catch(err =>{
            console.log("error get category vendor", err)
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

      const submit = () => {
        if(!nama || !email){
            setMessage('Name or email is required !')
        }
        else if(!phone || !fax){
            setMessage('Phone or fax is equired')
        }else if (!deskripsi || !alamat){
            setMessage('Deskripsi or alamat is required !')
        }else{
            const sendData = {
                category: selectedCategory.id,
                name: nama,
                description: deskripsi,
                image: imagePict,
                phone: phone,
                address: alamat,
                provinceid: selectedProvinsi.id,
                cityid: selectedKota.id,
                email: email,
                fax: fax,
            }
            props.addVendor(sendData);
        }
      }
      const clearData = () => {
        setImage('')
        setNama('');
        // setCategory('');
        setSelectedCategory([])
        setDeskripsi('');
        setPhone('');
        setImagePict('');
        setAlamat('');
        setEmail('');
        setFax('');
        setMessage('');
        setSelectedProvinsi([]);
        setSelectedKota([]);
      }
      return(
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <View style={styles.logoTokoView}>
                <TouchableOpacity onPress={selectPict}>
                    <Image style={styles.logoImg} source={image ? { uri: image } : {uri : 'https://cdn.onlinewebfonts.com/svg/img_234957.png'}}/>
                </TouchableOpacity>
                {/* <Text>Logo toko</Text> */}
            </View>
            <View style={styles.formView}>
                <Text style={styles.formTitle}>Nama</Text>
                <TextInput 
                    // style={styles.textInput} 
                    value={nama}
                    onChangeText={(text) => setNama(text)}
                    placeholder="Masukkan nama toko"
                />
            </View>
            <View style={styles.itemViewText}>
                <View>
                    <Text style={styles.formTitle}>Kategori</Text>
                    <SearchableDropdown
                        textInputProps={{height: 40, fontSize: 20}}
                        onTextChange={(text) => console.log(text)}
                        onItemSelect={(item) => {setSelectedCategory(item)}}
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
                        items={category}
                        defaultIndex={0}
                        placeholder="Pilih Kategori"
                        // placeholderTextColor="#000"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>
            <View style={styles.formView}>
                <Text style={styles.formTitle}>Email</Text>
                <TextInput 
                    // style={styles.textInput} 
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Masukkan tagline toko"
                />
            </View>
            <View style={styles.formView}>
                <Text style={styles.formTitle}>Phone</Text>
                <TextInput 
                    // style={styles.textInput} 
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    placeholder="Masukkan merek produk"
                />
            </View>
            <View style={styles.formView}>
                <Text style={styles.formTitle}>Fax</Text>
                <TextInput 
                    // style={styles.textInput} 
                    value={fax}
                    onChangeText={(text) => setFax(text)}
                    placeholder="Masukkan merek produk"
                />
            </View>
            <View style={styles.formView}>
                <Text style={styles.formTitle}>Deskripsi</Text>
                <TextInput 
                    // style={styles.textInputAlamat} 
                    multiline 
                    numberOfLines={10} 
                    value={deskripsi}
                    onChangeText={(text) => setDeskripsi(text)}
                    placeholder="Masukkan alamat lengkap"
                />
            </View>
            {/* PROVINSI ITEM START */}
            <View style={styles.itemViewText}>
                <View style={{paddingVertical: 10,}}>
                    <Text style={styles.formTitle}>Provinsi</Text>
                    <SearchableDropdown
                        textInputProps={{height: 40, fontSize: 20}}
                        onTextChange={(text) => console.log(text)}
                        onItemSelect={(item) => {setSelectedProvinsi(item)}}
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
                        items={props.provinceData}
                        defaultIndex={0}
                        placeholder="Pilih Kategori"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>
            {/* PROVINSI ITEM END */}
            
            {/* KABUPATEN/KOTA ITEM START */}
            <View style={styles.itemViewText}>
                <View style={{paddingVertical: 10,}}>
                    <Text>Kabupaten/Kota</Text>
                    <SearchableDropdown
                        textInputProps={{height: 40, fontSize: 20}}
                        onTextChange={(text) => console.log(text)}
                        onItemSelect={(item) => {setSelectedKota(item)}}
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
                        items={dataKotaFilter}
                        defaultIndex={0}
                        placeholder="Pilih Kategori"
                        // placeholderTextColor="#000"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                </View> 
            </View>
            {/* KABUPATEN/KOTA ITEM END */}
            <View style={styles.formView}>
                <Text style={styles.formTitle}>Alamat lengkap</Text>
                <TextInput 
                    // style={styles.textInputAlamat} 
                    multiline 
                    numberOfLines={10} 
                    value={alamat}
                    onChangeText={(text) => setAlamat(text)}
                    placeholder="Masukkan alamat lengkap"
                />
            </View>
            {/* <View style={styles.formView}>
                <Text style={styles.formTitle}>No Hp</Text>
                <TextInput style={styles.textInput} placeholder="Masukkan no hp"/>
            </View> */}
            
            <View style={{alignItems: 'center'}}>
                <Text style={{color: 'red'}}>{message}</Text>
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => {
                        submit(),
                        clearData();
                    }}
                >
                    <Text>SUBMIT</Text>
                </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )
}

const mapStateToProps = (state) => ({
    provinceData: state.locations.province,
    dataKota: state.locations.city,
})

const mapStateDispatchToProps = (dispatch) => ({
    addVendor: (data) => dispatch({type: 'ADD_VENDOR', payload: data})
})


export default connect(mapStateToProps, mapStateDispatchToProps)(RegisterVendor);

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    btnSubmit:{
        width: '60%',
        backgroundColor: '#dba225',
        padding: 15,
        alignItems: "center",
        borderRadius: 20,
        marginVertical: 30
    },
    textInput:{
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#b5b5b3"
    },
    textInputAlamat:{
        height: 100,
        padding: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#b5b5b3" 
    },
    formView:{
        borderBottomWidth: 0.5,
        borderColor: '#000',
        marginBottom: 10,
        paddingVertical: 5
    },
    logoTokoView:{
        marginVertical: 15,
        alignItems: 'center',
    },
    logoImg:{
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 100
    },
    formTitle:{
        marginBottom: 5,
        fontWeight: '500'
    },
    itemViewText:{
        borderBottomWidth: 0.5,
        borderColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },   
    itemView:{
        borderBottomWidth: 0.5,
        borderColor: '#000',
        flexDirection: 'row',
        alignItems: 'center'
    },    
    // containerActive: {
    //     flex: 1,
    //     justifyContent: 'flex-end',
    //     // backgroundColor: '#fff',
    // },
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
        // marginHorizontal: 10
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
  