import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import Animated, { interpolate, Extrapolate, useAnimatedStyle, useAnimatedProps, useSharedValue } from "react-native-reanimated";
import { MAX_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import { BUTTON_HEIGHT } from "./ShufflePlay";


export default ({ album: { cover }, y }) => {
  //const width = useSharedValue(50);
  //const scale = useSharedValue(1);

  //const scale = interpolate(y.value, [-MAX_HEADER_HEIGHT, 0], [4, 1], Extrapolate.CLAMP);
  const opacity = interpolate(y.value, [-64, 0, HEADER_DELTA], [0, 0.2, 1], Extrapolate.CLAMP);

  const scale2 = useAnimatedStyle(() => {
    const scaleInt = interpolate(y.value, [0, 260], [1, 4], Extrapolate.CLAMP);
    return { transform: [{ scale: scaleInt }] }
  })


  return (
    <Animated.View style={[styles.container, scale2]
    }>
      <Image style={styles.image} source={cover} />
      <Animated.View
        style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "black", opacity }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT * 2,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
