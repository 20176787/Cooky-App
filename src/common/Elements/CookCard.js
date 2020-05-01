import React from 'react';
import {Text, View, Image, Dimensions,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const {width: viewportWidth} = Dimensions.get('window');

export default function CookCard({item}) {
    const navigation = useNavigation();
  return (
    <View
      style={{
        margin: 10,
        borderRadius: 12,
        backgroundColor: '#fff',
        padding: 10,
      }}>
        <TouchableOpacity onPress={()=>navigation.navigate('User',{user:item.UserInfo})}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
        <Image
          // resizeMode="center"
          style={{borderRadius: 25, width: 50, height: 50}}
          source={{uri: item.UserInfo.AvatarUrl.replace('28x28cq50', '120x120cq100').replace('32x32cq50', '120x120cq100'),}}
        />
        <Text style={{fontSize: 20, marginLeft: 5, flex: 1}} numberOfLines={1}>
          {item.UserInfo.DisplayName}
        </Text>
          <Text style={{color:'#c1c1c1'}}>
              26/04/2020
          </Text>
      </View>
        </TouchableOpacity>
      {item.Img ? (
        <Image
          resizeMode="cover"
          style={{
            borderRadius: 5,
            width: viewportWidth * 0.9,
            height: viewportWidth * 0.6,
          }}
          source={{uri: item.Img.replace('28x28cq50', '120x120cq100').replace('32x32cq50', '120x120cq100')}}
        />
      ) : null}
      <Text
        style={{
          fontSize: 20,
          marginTop: 20,
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
        }}>
        {item.Name}
      </Text>
    </View>
  );
}
