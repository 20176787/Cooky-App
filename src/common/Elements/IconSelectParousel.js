import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
export default function IconSelectParosel({image, key}) {
  const [index, setIndex] = useState(null);
  return (
    <TouchableOpacity
      key={key}
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
      }}
      onPress={() => setIndex(key)}>
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
          margin: 5,
          backgroundColor: key === index ? '#ff000f' : '#fff',
          // opacity: key === index ? 0.5 : 1,
        }}
      />
    </TouchableOpacity>
  );
}
