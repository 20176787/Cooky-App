import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SvgBack from '../common/Components/icons/Back';
import SvgDots from '../common/Components/icons/Dots';
import {getUser} from '../api/helper';
import CookCard from '../common/Elements/CookCard';
export default function UserScreen({route, navigation}) {
  const user = route.params.user;
  const id = user.Id;
  const [bgUser, setBgUser] = useState(null);
  const [info, setInfo] = useState(null);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reLoading, setReloading] = useState(false);
  const [follow, setFollow] = useState(false);
  async function LoadData(id) {
    const response = await getUser(id);
    setBgUser(response.data.bgUer);
    setInfo(response.data.userInfo);
    setItems([...items, ...response.data.items]);
    setNextPage(response.data.nextPage);
    setReloading(false);
    console.log(response.data);
  }
  async function loadNextPage(id, page) {
    const response = await getUser(id, page);
    setItems([...items, ...response.data.items]);
    setNextPage(response.data.nextPage);
  }
  const loadMore = () => {
    if (nextPage !== '') {
      loadNextPage(id, nextPage);
    }
  };
  const onRefreshing = () => {
    setReloading(true);
    LoadData(id);
  };
  useEffect(() => {
    LoadData(id);
  }, []);
  return (
    <View>
      <View
        style={{
          backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgBack color={'#fff'} width={30} height={30} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
          {user.DisplayName}
        </Text>
        <SvgDots color={'#fff'} />
      </View>
      <View style={{height: '93%'}}>
        {items.length > 0 ? (
          <FlatList
            ListHeaderComponent={
              <View style={{backgroundColor: '#fff'}}>
                <View>
                  <Image
                    style={{width: '100%', height: 200}}
                    source={{
                      uri: bgUser,
                    }}
                  />
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 75,
                      position: 'absolute',
                      marginTop: 120,
                      alignSelf: 'center',
                      borderColor: '#f2f2f2',
                      borderWidth: 4,
                    }}
                    source={{
                      uri: user.AvatarUrl.replace(
                        '28x28cq50',
                        '120x120cq100',
                      ).replace('32x32cq50', '120x120cq100'),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      alignItems: 'center',
                      paddingTop: 80,
                      alignSelf: 'center',
                    }}>
                    {user.DisplayName}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: follow ? 'red' : 'green',
                      borderRadius: 5,
                      alignSelf: 'center',
                      width: 100,
                      height: 30,
                      alignItems: 'center',
                      marginTop: 10,
                    }} onPress={()=>setFollow(!follow)}>
                    {follow ? (
                      <Text
                        style={{color: '#fff', fontSize: 16, paddingTop: 2}}>
                        Đã Theo Dõi
                      </Text>
                    ) : (
                      <Text
                        style={{color: '#fff', fontSize: 16, paddingTop: 2}}>
                        Theo Dõi
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                {info !== null ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 30,
                    }}>
                    <View>
                      <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                        {info.mon}
                      </Text>
                      <Text style={{color: 'gray'}}>Món</Text>
                    </View>
                    <View>
                      <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                        {info.nguoiquantam}
                      </Text>
                      <Text style={{color: 'gray'}}>Người Quan Tâm</Text>
                    </View>
                    <View>
                      <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                        {info.banbep}
                      </Text>
                      <Text style={{color: 'gray'}}>Bạn Bếp</Text>
                    </View>
                  </View>
                ) : null}
              </View>
            }
            data={items}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Detail', {item})}>
                <CookCard item={item} />
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <TouchableOpacity
                style={{alignItems: 'center', justifyContent: 'center'}}
                onPress={() => loadMore()}>
                <Text
                  style={{fontSize: 20, marginBottom: 20, color: '#8a8a8a'}}>
                  Load more...
                </Text>
              </TouchableOpacity>
            }
            refreshing={reLoading}
            onRefresh={onRefreshing}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 20,
            }}>
            <ActivityIndicator />
            <Text>Updating...</Text>
          </View>
        )}
      </View>
    </View>
  );
}
