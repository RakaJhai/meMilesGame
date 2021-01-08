import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

import {useNetInfo} from "@react-native-community/netinfo";

export default function YourComponent(){
  const netInfo = useNetInfo();
  return (
    <View>
      <Text>Type: {netInfo.type}</Text>
      <Text>Is Connected? {netInfo.isConnected.toString()}</Text>
      { netInfo.isConnected == false ? ( 
        <View style={{borderRadius: 50, backgroundColor: '#f2f2f2', padding: 15}}>
          <ActivityIndicator size="large" color="#7971EA" />
        </View>
        ) : (
          <View>
            <Text>Hallo Gaes</Text>
          </View>
        )
      }
    </View>
  );
};