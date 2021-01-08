import React, { useState } from 'react';
import {View, Text, Image, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from 'react-native-check-box'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function VendorDetail(props) {
    
    const dataParamVendor = props.route.params;
    const [popupIklan, setPopUpIklan] = useState(true)
    console.log("Screen Detail Vendor", dataParamVendor.phone.slice(1))

    let urlWa = 'whatsapp://send?text=' + "Hallo" + '&phone=+62' + dataParamVendor.phone.slice(1);
    let urlTel = `tel:+62${dataParamVendor.phone.slice(1)}`
    return (
        <View style={{marginHorizontal: 20, height: hp('90%')}}>
            <View style={{alignItems: 'center', marginVertical: 20}}>
                <Image style={{width: 150, height: 150, resizeMode: 'cover', borderRadius: 100}} source={{uri: dataParamVendor.image}}/>
            </View>
            <View style={{
                borderBottomColor: 'blue', 
                borderBottomWidth: 0.5,
                paddingVertical: 10
            }}>
                <Text style={{fontSize: 20, fontWeight: '700',}}>Nama : <Text style={{fontSize: 18, fontWeight: '400'}}>{dataParamVendor.name}</Text></Text>
            </View>
            <View style={{ 
                borderBottomColor: 'blue', 
                borderBottomWidth: 0.5,
                paddingVertical: 10,
            }}>
                <Text style={{fontSize: 18, fontWeight: '700', textAlignVertical: 'top'}}>
                    Deskripsi: <Text style={{fontSize: 18, fontWeight: '400', textAlignVertical: 'top'}}>{dataParamVendor.short_description}</Text></Text>
            </View>
            <View style={{flexDirection: 'row', position: 'absolute', bottom: 10}}>
                <TouchableOpacity
                    style={styles.btnCall}
                    onPress={() => Linking.openURL(urlTel)}
                >
                    <Text style={styles.btnText}>Telepon</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnWa}
                    onPress={() => Linking.openURL(urlWa)}
                >
                    <Text style={styles.btnText}>Whatsapp</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default VendorDetail;

const styles = StyleSheet.create({
    btnCall:{
        flex: 1, 
        alignItems: 'center', 
        backgroundColor: '#00e600',
        padding: 10,
        fontWeight:'900',
    },
    btnWa:{
        flex: 1, 
        alignItems: 'center', 
        backgroundColor: '#25D366',
        padding: 10,
        fontWeight:'900',
    },
    btnText:{
        color: '#fff', 
        fontWeight: '900'
    }
})