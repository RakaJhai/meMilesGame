import React, {useState, useCallback} from 'react';
import { StyleSheet,RefreshControl, ScrollView, Text, View, Image, TouchableOpacity, ImageBackground, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import NetInfo from "@react-native-community/netinfo";
import {useNetInfo} from "@react-native-community/netinfo";
import moment from 'moment';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

const timeWait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

function DetailsScreen(props){
    const netInfo = useNetInfo();
    const[detail, setDetail] = useState('play');
    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    const [activeLike, setActiveLike] = useState(null);

    const dataDetails = props.route.params;
 
    const addComment = () => (
      props.addCommentGames({
        gamesid: dataDetails.gamesId,
        customerid: props.dataUser.id,
        comment: comment 
      })
    )
      // console.log("Detail net info", netInfo)
    const onRefresh = useCallback(() => {
        setRefreshing(true);

        timeWait(2000).then(() => setRefreshing(false));
    }, []);
    
    console.log('Screen like data', props.likeData)
    return(
      <View style={{flex: 1}}>
        <ImageBackground blurRadius={1} source={{uri: dataDetails.gamesimage}} style={styles.imageBackground}>   
            <View style={{justifyContent: 'flex-start', marginVertical: 30, marginHorizontal: 10}}>
              { detail == 'play' && (
                <ScrollView showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                >
                  <View style={{paddingTop:30}}></View>
                  <View style={styles.scoreDesc}>
                    <View style={{flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          { props.likeData.length <= 0 ?
                            (
                              <TouchableOpacity
                                    style={styles.likeIconActive}
                                    onPress={() => {
                                      props.addLike({gamesid: dataDetails.gamesId})
                                      // setActiveLike(index)
                                    }}
                                  >
                                <FontAwesome name="heart-o" size={18} color="#ff6666"/>
                                </TouchableOpacity>
                            ):(
                                <>
                                    <FontAwesome name="heart" size={24} color="#ff6666"/>
                                    <Text style={{color: '#fff', fontSize: 20}}> {props.likeData.length}</Text>
                                </>
                            )
                          }
                        </View>
                        {/* <Text style={styles.title}>{dataDetails.gamesname}</Text> */}
                      </View>
                    <View>
                      <Text style={styles.title}>{dataDetails.gamesname}</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={{textAlign: 'justify', color: '#fff'}}>{dataDetails.gamesdesc}</Text>
                    </View>
                    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                      <TouchableOpacity
                        style={styles.btnScore}
                        // onPress={() => 
                        //   setModalVisible(true)}
                      >
                        <Text style={{fontSize: 20}}>HIGH SCORE</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={styles.btnPlay}
                        onPress={() => 
                          setModalVisible(true)}
                      >
                        <Text style={{fontSize: 20}}>PLAY</Text>
                        <Ionicons name="play" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.contenTitle}>
                      <Text style={{fontSize: 24, fontWeight: '700', color: '#fff'}}>VENDOR LIST</Text>
                  </View> 
                  <ScrollView>
                      { props.dataVendor.map((item, index) => (
                          <View key={index}>
                            {item.name ?
                              <TouchableOpacity
                                style={styles.scoreContent}
                                onPress={() => props.navigation.replace('DetailVendor', item)}
                              >
                              
                                <View style={{borderRadius: 100, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}>
                                  <Text style={{fontSize: 20, fontWeight: '700'}}>{index+1}</Text>
                                </View>
                                <View style={{justifyContent: 'center',}}>
                                  <Text style={{fontSize: 20, fontWeight: '700'}}>{item.name}</Text>
                                </View>
                              </TouchableOpacity>
                            : <Text>No data available</Text>
                            }
                          </View>
                      )) 
                    }
                  </ScrollView>
                </ScrollView>
              )
            }
            </View>
            <View style={{flex: 1}}>
              {detail == 'comment' && ( 
                <ScrollView showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                >
                <View style={{backgroundColor: '#fff'}}>
                    <View>
                      <Text style={styles.titleComment}>COMMENTS</Text>
                    </View>
                    <View style={{height: "100%"}}>
                      <ScrollView>
                        {props.detailComment.map((item, index) => (
                            <View key={index} style={{
                                marginHorizontal: 15, 
                                padding: 10,
                                borderWidth: 1,
                                borderColor: '#cccccc',
                                marginBottom: 2,
                                borderRadius: 10,
                                backgroundColor: '#e6ecff'
                            }}>
                              <View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#cccccc'}}>
                                <Text style={{marginRight: 20,fontSize: 18}}>{item.name}</Text>
                                <Text>{moment(item.commentdate).format("lll") }</Text>
                              </View>
                              <View style={{marginTop: 5}}>
                                <Text>{item.comment}</Text>
                              </View>
                            </View>
                          ))
                        }
                      </ScrollView>
                    </View>
                </View>
                </ScrollView>
                )
              }
            </View>
            <View style={styles.btnChoose}>
              <TouchableOpacity
                onPress={() => setDetail('play')}
                style={detail == 'play' ? styles.btnChooseActive : styles.btnChooseInActive }
              >
                <Text style={detail == 'play' ? styles.btnActiveText : styles.btnInActiveText}>Play</Text> 
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setDetail('comment')}
                style={detail == 'comment' ? styles.btnChooseActive : styles.btnChooseInActive}
              >
                <Text style={detail == 'comment' ? styles.btnActiveText : styles.btnInActiveText}>All Comments ({props.detailComment.length})</Text>
              </TouchableOpacity>
            </View>  
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
                  <View>
                    <Text style={styles.modalText}>PopUp Modal</Text>
                  </View>

                  <TouchableOpacity
                    style={{position: 'absolute', right: 5, top: 5}}
                    onPress={() => {
                      setModalVisible(!modalVisible), 
                      props.navigation.navigate('PlayGame', dataDetails)
                    }}
                  >
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
        </ImageBackground >
      </View>
    )
}

const mapStateToProps = (state) => ({
  highScoreList: state.scoreList,
  detailComment: state.comment.detailComments,

  dataUser: state.auth.dataUser,
  listGame: state.gameList,
  commentLenght: state.comment.dataGetComm,
  likeData: state.like.getLike,
  dataVendor: state.vendor.dtGetVendor,
})

const mapDispatchToProps = (dispatch) => ({
  addCommentGames: (dataComment) => dispatch({type: 'ADD_COMMENT_GAMES', payload: dataComment}),
  addLike: (likeData) => dispatch({type: 'ADD_LIKE', payload: likeData}),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen); 

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image:{
    width: '100%',
    height: '50%',
  },
  textInputComment:{
    borderWidth: 1,
    borderColor: '#cccccc',
    // marginHorizontal: 15,
    height: 100,
    padding: 10 
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  scoreDesc:{
    marginVertical: 20, 
    backgroundColor: '#000',
    padding: 10, 
    borderRadius: 5,
    // shadowColor: "#fff",
    shadowColor: "#e6e6e6",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 2,
    shadowRadius: 6.27,
    elevation: 10,
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff'
  },
  likeIconActive: {
    marginRight: 5
  },
  contenTitle:{
    alignItems: 'center', 
    padding: 15,  
    backgroundColor: '#3333ff',
    borderRadius: 5,
    marginBottom: 1,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  btnScore:{
    alignItems:  'center', 
    backgroundColor: '#1ad1ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10
  },
  btnPlay:{
    flexDirection: 'row', 
    alignItems:  'center', 
    backgroundColor: '#1ad1ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  scoreContainer: {
    padding: 16, 
    borderRadius: 5,
    marginHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scoreContent_1:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    backgroundColor: '#3edc09', 
    marginBottom: 0.5, 
    borderRadius: 10,
    padding: 5,
  },
  scoreContent_2:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    backgroundColor: '#57f623', 
    marginBottom: 0.5, 
    borderRadius: 10,
    padding: 5,
  },
  scoreContent_3:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    backgroundColor: '#7df854', 
    marginBottom: 0.5, 
    borderRadius: 10,
    padding: 5,
  },
  scoreContent_4:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    backgroundColor: '#a2fa85', 
    marginBottom: 0.5, 
    borderRadius: 10,
    padding: 5,
  },
  scoreContent_5:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    backgroundColor: '#c8fcb6', 
    marginBottom: 0.5, 
    borderRadius: 10,
    padding: 5,
  },
  scoreContent:{
    flexDirection: 'row', 
    // justifyContent: 'space-between',
    backgroundColor: '#edfee7', 
    marginBottom: 0.5, 
    borderRadius: 10,
    padding: 5,
  },
  scoreContent_empty:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    backgroundColor: '#000', 
    marginBottom: 0.5, 
    borderRadius: 10,
    padding: 5,
  },
  btnChoose:{
    flexDirection: 'row', 
    position: 'absolute', 
    top: 0, 
    width: '100%', 
    marginBottom: 10, 

  },    
  btnChooseActive:{
    flex: 1, 
    alignItems: 'center', 
    backgroundColor: 'rgba(6, 92, 166, 0.66)',
    padding: 10,
    fontWeight:'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'orange'
  },
  btnChooseInActive:{
    flex: 1, 
    alignItems: 'center', 
    backgroundColor: 'rgba(2, 78, 144, 0.94)',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF'
  },
  btnActiveText:{
    color: '#fff', 
    fontSize: 20, 
    fontWeight: '800'
  },
  btnInActiveText:{
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '800'
  },
  titleComment:{
    fontSize: 20, 
    fontWeight: '700', 
    textAlign: 'center', 
    color: '#000', 
    marginVertical: 10, 
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // marginHorizontal: 10,
    height: '100%'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 0,
    padding: 35,
    alignItems: "center",
    width: '100%',
    height: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});
  