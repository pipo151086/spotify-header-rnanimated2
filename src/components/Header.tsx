import React, { useState } from "react";
import { Text, StyleSheet, View, StatusBar } from "react-native";
//import Constants from "expo-constants";
import Animated, { interpolate, useAnimatedStyle, Extrapolate } from "react-native-reanimated";
import { MIN_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import { BUTTON_HEIGHT } from "./ShufflePlay";

export default ({ artist, y }) => {

  const variantHeaderDeltaMin = HEADER_DELTA + 50;
  const variantHeaderDeltaMax = HEADER_DELTA + 80;

  const opacity = useAnimatedStyle(() => {
    const opacityInt = interpolate(y.value, [variantHeaderDeltaMin, variantHeaderDeltaMax], [0, 1], Extrapolate.CLAMP,);
    return { opacity: opacityInt }
  })

  const textOpacity2 = useAnimatedStyle(() => {
    const opacityTextInt = interpolate(y.value, [variantHeaderDeltaMin, variantHeaderDeltaMax], [0, 1], Extrapolate.CLAMP,);
    return { opacity: opacityTextInt }
  })

  return (
    <Animated.View style={[styles.container, opacity]}>
      <Animated.Text style={[styles.title, textOpacity2]}>{artist}</Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: BUTTON_HEIGHT / 2 - MIN_HEADER_HEIGHT,
    left: 0,
    right: 0,
    //top: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: "black",
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    zIndex: 1,
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
});

