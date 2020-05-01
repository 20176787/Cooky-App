import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
    ActivityIndicator
} from 'react-native';
import {getDetail, getUser} from '../api/helper';
import SvgBack from '../common/Components/icons/Back';
import SvgDots from '../common/Components/icons/Dots';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width: viewportWidth} = Dimensions.get('window');
export default function DetailScreen({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [resources, setResources] = useState([]);
  const [items, setItems] = useState([]);
  const [userDesc, setUserDesc] = useState('-');
  const [data, setData] = useState(route.params.item);
  async function getUserInfo(id) {
    try {
      const response = await getUser(id);
      if (!response.data.error) {
        const tmp =
          response.data.userInfo.mon +
          ' món, ' +
          response.data.userInfo.nguoiquantam +
          ' người quan tâm.';
        setUserDesc(tmp);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function loadData(id) {
    try {
      if (data.UserInfo.Id) {
        getUserInfo(data.UserInfo.Id);
      }
      const response = await getDetail(id);
      if (!response.data.error) {
        const tmp = data;
        if (data.UserInfo.Id == '') {
          tmp.UserInfo.Id = response.data.userInfo.Id;
          getUserInfo(tmp.UserInfo.Id);
        }
        tmp.Img = response.data.imgItem;
        setResources(response.data.nguyenlieu);
        setStates(response.data.cacbuoc);
        setData(tmp);
        setItems(response.data.items);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (items.length === 0) {
      loadData(data.Id);
    } else {
      console.log('items:', items);
    }
  }, [items.length]);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgBack width={20} height={20} color={'#fff'} />
        </TouchableOpacity>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
          Chi tiết món ăn
        </Text>
        <SvgDots color={'#fff'} />
      </View>
      <ScrollView>
        <Image style={{width: '100%', height: 300}} source={{uri: data.Img}} />
          {states.length?(
              <View>
        <View style={{margin: 10}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              paddingTop: 10,
              color: '#343434',
            }}>
            {data.Name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 50, height: 50, borderRadius: 25, marginTop: 20}}
              source={{uri: data.UserInfo.AvatarUrl}}
            />
            <View style={{marginTop: 20, paddingLeft: 10}}>
              <Text
                style={{fontWeight: 'bold', fontSize: 16, color: '#343434'}}>
                {data.UserInfo.DisplayName}
              </Text>
              <Text style={{color: '#979797'}}>{userDesc}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              paddingTop: 20,
              fontSize: 20,
              margin: 10,
            }}>
            Nguyên liệu
          </Text>
          <View
            style={{
              borderBottomColor: '#c6c6c6',
              borderBottomWidth: 1,
              margin: 10,
            }}
          />
          {resources.map((item) => (
            <View>
              <Text key={item} style={{fontSize: 16, margin: 10}}>
                {item}
              </Text>
              <View
                style={{
                  borderBottomColor: '#c6c6c6',
                  borderBottomWidth: 1,
                  margin: 10,
                }}
              />
            </View>
          ))}
        </View>
        <View style={{margin: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Hướng dẫn thực hiện
          </Text>
          {states.map((item, key) => (
            <View style={{paddingTop: 15}}>
              <Text style={{fontSize: 16}}>
                {key + 1}. {item.Text}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}>
                  <ScrollView horizontal >
                {item.Images.length !== 0 &&
                  item.Images.map((item) => (
                    <Image
                      style={{width: 185, height: 150, borderRadius: 15}}
                      source={{uri: item}}
                    />
                  ))}
                  </ScrollView>
              </View>
            </View>
          ))}
        </View>
        <View style={{margin: 10, paddingTop: 10, paddingBottom: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black',paddingBottom:20}}>
            Món mới của {data.UserInfo.DisplayName}
          </Text>
          {items.length > 0 ? (
            <FlatList
              data={items}
              keyExtractor={(item) => item.Id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => navigation.push('Detail', {item})}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      marginBottom: 60,
                      margin: 5,
                    }}>
                    <Image
                      resizeMode="cover"
                      style={{
                        width: viewportWidth * 0.45,
                        height: viewportWidth * 0.35,
                        borderRadius: 10,
                      }}
                      source={{uri: item.Img}}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: viewportWidth * 0.35,
                        position: 'absolute',
                      }}>
                      {item.Name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              horizontal={false}
              numColumns={2}
            />
          ) : (
              <View style={{paddingBottom:50}}>
                  <Text style={{fontSize:16}}>
                      Không có món mới nào
                  </Text>
              </View>
          )}
        </View>
              </View>
              ):(
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',paddingTop:20}}>
                  <ActivityIndicator/>
                  <Text>Updating...</Text>
              </View>
          )
              }
      </ScrollView>
    </SafeAreaView>
  );
}
