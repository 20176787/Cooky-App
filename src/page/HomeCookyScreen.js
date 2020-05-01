import React, {useEffect, useState,useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
    StatusBar
} from 'react-native';
import SvgSearch from '../common/Components/icons/Search';
import BackgroundParousel from '../common/Elements/BackgroundParousel';
import IconSelectParosel from '../common/Elements/IconSelectParousel';
import {getAll, getSearch} from '../api/helper';
import CookCard from '../common/Elements/CookCard';
export default function HomeCookyScreen({navigation}) {
  const Ref=useRef();
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(null);
  const [signature, setSignature] = useState(null);
  const data = [
    {
      name: 'Ăn sáng',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/breakfast.png?alt=media&token=ebb10ce1-b823-4533-9cee-34935e478724',
    },
    {
      name: 'Ăn vặt',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/popcorn.png?alt=media&token=e89f8e29-e743-42a7-a0ae-92104d630648',
    },
    {
      name: 'Khai vị',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/dessert.png?alt=media&token=febeafad-a20c-45e7-8826-241f86fdcea7',
    },
    {
      name: 'Món chay',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/vegetable.png?alt=media&token=efef5e0f-094b-4470-9478-33222d9cdb28',
    },
    {
      name: 'Món chính',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/maincourse.png?alt=media&token=e8e00e5f-4981-43ae-9c97-604b52e04cb7',
    },
    {
      name: 'Nhanh - Dễ',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/quickeasy.png?alt=media&token=b588e955-b6d3-4204-9805-badebc5ac3d6',
    },
    {
      name: 'Làm bánh',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/baking.png?alt=media&token=2d960692-4900-4cf2-94fb-99ee9d75f578',
    },
    {
      name: 'Healthy',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/healthy.png?alt=media&token=80e3527a-fa76-4ad7-a1f6-35e0e2c4e419',
    },
    {
      name: 'Thức uống',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/drinks.png?alt=media&token=79c46827-f3a5-4dd8-98da-2d812d85b7a5',
    },
    {
      name: 'Salad',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/salad.png?alt=media&token=42795cd4-c5c1-40dd-930a-eee405cdf1e0',
    },
    {
      name: 'Nước chấm',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/sauce.png?alt=media&token=2d4bdb24-bb81-41f0-a341-f14ff3f5461e',
    },
    {
      name: 'Pasta - Spaghetti',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/pasta.png?alt=media&token=97e89929-7781-4977-8df4-c9a805dfa114',
    },
    {
      name: 'Gà',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/chicken.png?alt=media&token=34895a67-4992-4642-b15c-a9975c1da547',
    },
    {
      name: 'Snacks',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/snack.png?alt=media&token=aff1855b-92c6-4b9c-9e31-25ecc75348e8',
    },
    {
      name: 'Bún - Mì - Phở',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/noodle.png?alt=media&token=17cf0268-4b25-4ccf-bdd8-4e6ef07d45ce',
    },
    {
      name: 'Lẩu',
      img:
        'https://firebasestorage.googleapis.com/v0/b/loginwithfirebase-3651d.appspot.com/o/hotspot.png?alt=media&token=22e1c769-2255-4b8d-ab8a-d5e928075ff3',
    },
  ];
  const datacarousel = [
    'https://cdn.pixabay.com/photo/2017/12/09/16/41/snow-man-3008179_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/12/12/22/35/snowman-1090261_1280.jpg',
    'https://media.cooky.vn/ads/s/cooky-ads-637223976948251031.jpg',
    'https://media.cooky.vn/ads/s/cooky-ads-637209188010878683.jpg',
    'https://media.cooky.vn/ads/s/cooky-ads-637209188951193368.jpg',
  ];
  useEffect(() => {
    if (items.length === 0) {
      loadData();
    }
  }, []);
  async function loadData() {
    try {
      const response = await getAll();
      setItems(response.data.items);
      console.log(response.data);
      setNextPage(response.data.nextPage);
      setRefreshing(false);
      setLoading(false);
    } catch (e) {
      setRefreshing(false);
      setLoading(false);
    }
  }
  async function LoadNextPage(id) {
    try {
      const response = await getAll(id);
      setItems([...items, ...response.data.items]);
      setNextPage(response.data.nextPage);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }
  async function LoadNextPageDetail(id,page) {
    try {
      const response = await getSearch(id,page);
      setItems([...items, ...response.data.items]);
      setNextPage(response.data.nextPage);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }
  const LoadMore = () => {
    setLoading(true);
    if(signature===null) {
      LoadNextPage(nextPage);
    }
    else {
      LoadNextPageDetail(signature,nextPage);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    setIndex(null);
    setSignature(null);
    loadData();
  };
  async function fetchPlaces(ind) {
    try {
      Ref.current.scrollToOffset({animated: true, offset: 0});
      const response = await getSearch(ind);
      setItems(response.data.items);
      setNextPage(response.data.nextPage);
      setRefreshing(false);
      setLoading(false);
    } catch (e) {
      setRefreshing(false);
      setLoading(false);
    }
  }
  return (
    <View>
      <View
        style={{
          backgroundColor: 'red',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 5,
            width: '80%',
            height: 30,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
            alignSelf: 'center',
          }}>
          <TouchableWithoutFeedback onPress={()=>navigation.navigate('Search')}>
            <Text
              style={{
                color: '#dadada',
                fontSize: 12,
                paddingTop: 5,
                paddingLeft: 10,
              }}>
              Tìm kiếm tên món ăn...
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <SvgSearch color={'white'} height={40} left={10} />
      </View>
      <BackgroundParousel image={datacarousel} />
      <View style={{paddingTop: 10}}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}>
          {data.map((image, key) => (
            <TouchableOpacity
              key={key}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: 5,
              }}
              onPress={()=>{fetchPlaces(image.name);setIndex(key);setSignature(image.name)}}>
              <Image
                key={image.img}
                source={{uri: image.img}}
                style={{width: 70, height: 70}}
              />
              <Text key={image.name}>{image.name}</Text>
              <View
                key={key * 10}
                style={{
                  width: 70,
                  height: 6,
                  borderRadius: 3,
                  // margin: 5,
                  backgroundColor: key === index ? '#ff000f' : '#fff',
                  // opacity: key === index ? 0.5 : 1,
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{height: '55%'}}>
        {items.length > 0 ? (
          <FlatList
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
                onPress={() => LoadMore()}>
                <Text
                  style={{fontSize: 20, marginBottom: 20, color: '#8a8a8a'}}>
                  Load more...
                </Text>
              </TouchableOpacity>
            }
            refreshing={refreshing}
            onRefresh={onRefresh}
            ref={Ref}
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
