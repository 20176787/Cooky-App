import React, {useState, useEffect, createRef, useRef} from 'react';
import {View, Text, ScrollView, Image, Dimensions} from 'react-native';
const WIDTH = Dimensions.get('window').width;
export default function BackgroundParousel({image}) {
  const scrollRef = useRef();
  const [index, setIndex] = useState(0);
  const setSelectIndex = (e) => {
    const viewSize = e.nativeEvent.layoutMeasurement.width;
    const currentOffset = e.nativeEvent.contentOffset.x;
    const selectedIndex = Math.floor(currentOffset / viewSize);
    setIndex(selectedIndex);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % image.length);
      // console.log(index);
      scrollRef.current.scrollTo({
        animated: true,
        y: 0,
        x: WIDTH * ((index+1)%image.length),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={setSelectIndex}
        ref={scrollRef}>
        {image.map((image, key) => (
          <Image
            key={key}
            source={{uri: image}}
            style={{width: WIDTH, height: 200}}
          />
        ))}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 15,
          height: 18,
          width: WIDTH,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {image.map((image, i) => (
          <View
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              margin: 5,
              backgroundColor: '#fff',
              opacity: i === index ? 0.5 : 1,
            }}
          />
        ))}
      </View>
    </View>
  );
}
