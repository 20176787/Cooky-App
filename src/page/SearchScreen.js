import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import SvgBack from '../common/Components/icons/Back';
import SvgSearch from '../common/Components/icons/Search';
import {getAll, getSearch} from '../api/helper';
import CookCard from '../common/Elements/CookCard';
export default function SearchScreen({navigation}) {
  const [search, setSearch] = useState(null);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [resource, setResource] = useState(null);
  // const [signature, setSignature] = useState(null);
  async function fetchPlaces(q) {
    try {
      const response = await getSearch(q);
      setItems(response.data.items);
      setResource(response.data.soluong);
      setNextPage(response.data.nextPage);
      setLoading(false);
      setRefreshing(false);
    } catch (e) {
      setLoading(false);
      setRefreshing(false);
    }
  }
  async function getALl() {
    try {
      const response = await getAll();
      setItems(response.data.items);
      setResource(response.data.soluong);
      setNextPage(response.data.nextPage);
      setLoading(false);
      setRefreshing(false);
    } catch (e) {
      setLoading(false);
      setRefreshing(false);
    }
  }
  useEffect(() => {
    if (items.length === 0) {
      getALl();
        console.log(items[0])
    }
  }, []);
  async function loadNextPage(ind, page) {
    try {
      const response = await getSearch(ind, page);
      setItems([...items, ...response.data.items]);
      setNextPage(response.data.nextPage);
      setResource(response.data.soluong);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }
  const onSearchChange = (ind) => {
    setLoading(true);
    fetchPlaces(ind);
    console.log(items[0])
  };
  return (
    <View>
      <View
        style={{
          backgroundColor: 'red',
          paddingBottom: 5,
          paddingTop: 5,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <SvgBack width={30} height={30} color={'#fff'} />
        <TextInput
          style={{
            backgroundColor: '#eeeeee',
            height: 30,
            margin: 5,
            width: '80%',
            paddingBottom: 5,
            paddingTop: 5,
            fontSize: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          value={search}
          placeholder={'Search...'}
          onChangeText={(text) => {
            setSearch(text);
          }}
          defaultValue={search}
          onSubmitEditing={() => onSearchChange(search)}
        />
        <SvgSearch color={'#fff'} />
      </View>
      <View>
        <Text style={{color:'#b2b2b2'}}>{resource} kết quả tìm kiếm cho từ khóa "{search}"</Text>
      </View>
      <View style={{height: '90%'}}>
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
                onPress={() => loadNextPage(search, nextPage)}>
                <Text
                  style={{fontSize: 20, marginBottom: 20, color: '#8a8a8a'}}>
                  Load more...
                </Text>
              </TouchableOpacity>
            }
            // refreshing={refreshing}
            // onRefresh={onRefresh}
            // ref={Ref}
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
