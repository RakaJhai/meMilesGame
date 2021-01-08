import React, { useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, ImageBackground, TouchableOpacity, SafeAreaView, Dimensions, Modal, RefreshControl } from 'react-native';
import { HEADER_STYLE } from '../styles/header';
import { connect } from 'react-redux';
import { FlatGrid } from 'react-native-super-grid';
import Internet from './Internet';

const consWidth = Dimensions.get('window').width * 0.8;
const consHeigth = Dimensions.get('window').height * 0.94;

const timeWait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

function MainScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [gamesId, setGamesId] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]);

  const onRefresh = useCallback(() => {
      setRefreshing(true);
      timeWait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    props.getGameList();
    setItems(props.listGame);
  },[props.listGame])
    
  const addComment = () => (
    props.addCommentGames({
      gamesid: gamesId,
      customerid: props.dataUser.id,
      comment: comment 
    })
  )

  // console.log('Screen List game', props.listGame)
  return (
    <SafeAreaView>
      <View style={{height: (consHeigth)}}>
        <View style={HEADER_STYLE}>
            <Image style={{width: "100%", height: "100%", resizeMode: 'contain'}} source={require('../../icons/logobulet.png')}/>
        </View>
        {/* <Internet /> */}
        <View style={{alignItems:'center'}} >
          <View style={styles.content}>
            <Text style={styles.contentText}>{props.dataProfile.name}</Text>
            <Text style={styles.contentText}>{props.dataProfile.phone}</Text>
              <View style={{paddingTop:5,alignItems:'center' ,justifyContent:'center'}}>
                <Text style={{paddingTop:1,fontSize:17,fontWeight:'bold',color:'yellow'}}>Group Leader</Text>
            </View>
          </View> 
          <View style={{justifyContent:'space-between', flexDirection:"row", width:'95%', marginVertical: 10}}>  
            <View style={styles.slotIklanContainer}>
              <Image source={require('../../icons/logobulet.png')} style={styles.logoImg} />
              <View style={{flexDirection:"column", alignItems: 'center'}}>
                <Text style={styles.iklanText}>Slot Iklan</Text>         
                <Text style={styles.iklanText}>{props.dataUser.saldo_format}</Text>     
              </View>
            </View>

            <View style={styles.slotIklanContainer}>
              <Image source={require('../../icons/koin.png')} style={styles.logoImg}/>
              <View style={{flexDirection:"column", alignItems: 'center'}}>
                <Text style={styles.iklanText}>Poin Miles</Text>         
                <Text style={styles.iklanText}>{props.dataUser.balance_format}</Text>         
              </View>
            </View>
          </View>
        </View>
        <FlatGrid
          itemDimension={130}
          data={items}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          extraData={true}
          spacing={10}
          renderItem={({ item, index }) => (
            <View style={styles.btnGridView}>
              <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Details', item)
                    props.getScores({gamesid: item.gamesid})
                    props.getcommentdetail({gamesid: item.gamesid})
                    props.getVendor({userid: props.dataUser.id})
                    props.getLike({gamesid: item.gamesid})
                  }
                }
              >
                <Image style={styles.itemContainer} source={{uri: item.gamesimage}} />
              </TouchableOpacity>              
              <Text style={styles.titleGame}>{item.gamesname}</Text>
              <View style={styles.iconContentGame}>
                <View  style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 5}}>
                  <TouchableOpacity
                    style={{marginRight: 5}}
                    onPress={() => {
                      setModalVisible(true);
                      setGamesId(item.gamesid)
                      console.log('Onpress chat', item.gamesid)
                    }}
                  >
                    <Ionicons name="chatbubble-ellipses-outline" size={22}  color="#4d4d4d" />
                  </TouchableOpacity>
                  <Text style={{color: '#4d4d4d'}}>{item.totalcomment}</Text>
                </View>
                <View style={{
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 3
                }}>
                  <Text style={{fontWeight: '700'}}>Vendor: 128</Text>
                </View>
              </View>
            </View>
          )}
          // numColumns={3}
          // renderSectionHeader={({ section }) => (
          //   <Text style={styles.sectionHeader}>{section.title}</Text>
          // )}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput 
                multiline 
                numberOfLines={10}
                value={comment}
                placeholder='Enter Comment'
                onChangeText={(text) => setComment(text)}
                style={styles.modalText} 
              />
              <View style={{flexDirection: 'row-reverse'}}>
                <TouchableOpacity
                  style={styles.btnComment}
                  onPress={() => {
                    addComment();
                    setComment('');
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={{color: '#e6e6e6'}}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.btnComment, width: 60}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={{color: '#e6e6e6'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  dataProfile: state.auth.dataUser.profile,
  dataUser: state.auth.dataUser,
  saldo: state.auth.dataUser.saldo,
  omzet: state.auth.dataUser.profile.omzet,
  listGame: state.gameList.list,
  commentLenght: state.comment.dataGetComm
})

const mapStateDispatchToProps = (dispatch) => ({
  getGameList: () => dispatch({type: 'GET_GML'}),
  getScores: (gameId) => dispatch({type: 'GET_SCORELIST', payload: gameId}),
  addCommentGames: (dataComment) => dispatch({type: 'ADD_COMMENT_GAMES', payload: dataComment}),
  getcommentdetail: (details) => dispatch({type: 'DETAILS_COMMENT', payload: details}), 
  getVendor: (getData) => dispatch({type: 'GET_VENDOR', payload: getData}),
  getLike: (dataLike) => dispatch({type: 'GET_LIKE', payload: dataLike})
})

export default connect(mapStateToProps, mapStateDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
  content:{
    justifyContent: 'flex-start',
    borderRadius:10,
    width:'95%',
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  btnComment:{
    marginHorizontal: 10, 
    marginVertical: 10, 
    borderRadius: 10,
    borderWidth: 0.5, 
    borderColor: '#bfbfbf',
    backgroundColor: '#b3b3b3', 
    width: 50, 
    height: 30, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  modalText: {
    height: 100,
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#b5b5b3",
    textAlignVertical: 'top'
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 200,
  },
  titleGame:{
    color: '#000', 
    fontSize: 18, 
    textAlign: 'center', 
    borderBottomWidth: 0.5, 
    borderBottomColor: '#cccccc', 
    paddingVertical: 2
  },
  btnGridView: {
    backgroundColor:'#fff',
    shadowColor: "#000",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  iconContentGame:{
    flexDirection: 'row-reverse', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginHorizontal: 10, 
    marginVertical: 2
  }
});