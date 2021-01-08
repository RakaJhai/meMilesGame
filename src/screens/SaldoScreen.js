import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';
import { HEADER_STYLE } from '../styles/header';

import { useEffect } from 'react/cjs/react.development';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import gameList from '../redux/reducer/gameList';
const consWidth = Dimensions.get('window').width * 0.8;
const consHeigth = Dimensions.get('window').height * 0.60;

function SaldoScreen(props) {

  return (
    <SafeAreaView>
      <View style={{ height: (consHeigth) }}>
        <View style={HEADER_STYLE}>
          <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={require('../../icons/logobulet.png')} />
        </View>
        <View>
          <View style={{ justifyContent: 'space-between', flexDirection: "row", width: '95%', marginVertical: 20 }}>
            <View style={{ justifyContent: 'space-between', flexDirection: "row", width: '100%', margin: 10 }} >
              <View style={styles.slotIklanContainer}>
                <Image source={require('../../icons/logobulet.png')} style={styles.logoImg} />
                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                  <Text style={styles.iklanText}>Slot Iklan</Text>
                  <Text style={styles.iklanText}>{props.saldo}</Text>
                </View>
              </View>

              <View style={styles.slotIklanContainer}>
                <Image source={require('../../icons/koin.png')} style={styles.logoImg} />
                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                  <Text style={styles.iklanText}>Poin Miles</Text>
                  <Text style={styles.iklanText}>{props.omzet}</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('TopUpSaldo')}
            style={styles.button}
          >
            <View style={styles.content2}>
              <Text style={styles.contentText}>Top Up Saldo</Text>

            </View>
          </TouchableOpacity>
          <View style={{ paddingTop: 20 }}></View>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('TopUpIklan')}
            style={styles.button}
          >
            <View style={styles.content2}>
              <Text style={styles.contentText}>Top Up Slot Iklan</Text>

            </View>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  nama: state.auth.dataUser.profile.name,
  profileid: state.auth.dataUser.profile.id,
  phone: state.auth.dataUser.profile.phone,
  saldo: state.auth.dataUser.saldo,
  omzet: state.auth.dataUser.profile.omzet,


})

const mapStateDispatchToProps = (dispatch) => ({


})
export default connect(mapStateToProps, mapStateDispatchToProps)(SaldoScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  content: {
    justifyContent: 'flex-start',
    borderRadius: 10,
    width: '95%',
    height: 100,
    backgroundColor: '#1e65a7'
  },
  content2: {
    justifyContent: 'center',
    borderRadius: 10,
    width: '97%',
    marginLeft: 5,

    height: 100,
    backgroundColor: '#1e65a7'
  },
  contentText: {
    paddingTop: 1,
    paddingLeft: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  slotIklanContainer: {
    width: '48%',
    elevation: 10,
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#18396f',
    justifyContent: 'space-around',
    flexDirection: "row",
    alignItems: 'center',
    borderRadius: 10,
    padding: 10
  },
  logoImg: {
    justifyContent: 'center',
    resizeMode: 'stretch',
    width: 45, height: 45
  },
  iklanText: {
    paddingLeft: 10,
    paddingTop: 2,
    color: 'black',
    fontSize: 19,
    fontWeight: '400'
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10
  }
});