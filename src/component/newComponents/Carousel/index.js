import React from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import CarouselItem from '../CarouselItem';

import { getDeviceWidth } from "../../../utils";

const width = getDeviceWidth();

const Carousel = ({ accounts, hideBalance, toggleHideBalance }) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  if (accounts && accounts.length) {
    return (
      <View>
        <FlatList
          data={accounts}
          keyExtractor={(account, index) => "key" + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <CarouselItem
                item={item}
                hideBalance={hideBalance}
                toggleHideBalance={toggleHideBalance}
              />
            );
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
        <View style={styles.dotView}>
          {accounts.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp'
            })
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: '#595959',
                  marginHorizontal: 8,
                  borderRadius: 5
                }}
              />
            )
          })}
        </View>
      </View>
    );
  };

  return null;
};

const styles = StyleSheet.create({
  dotView: { flexDirection: 'row', justifyContent: 'center', alignItems: "center" }
});

export default Carousel;