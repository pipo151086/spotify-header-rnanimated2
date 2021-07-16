import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import { MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT } from "./Model";
import Track from "./Track";
import ShufflePlay, { BUTTON_HEIGHT } from "./ShufflePlay";
import Header from "./Header";

export default ({ album: { artist, tracks }, y }) => {

  const scrollHandler = useAnimatedScrollHandler((event) => {
    y.value = event.contentOffset.y;
  });

  const animatedHeight = useAnimatedStyle(() => {
    const heightTmp = interpolate(y.value, [-MAX_HEADER_HEIGHT, -32], [0, MAX_HEADER_HEIGHT + 32], Extrapolate.CLAMP);
    return {
      height: heightTmp,
    };
  });

  const animatedOpacity = useAnimatedStyle(() => {
   const opacity = interpolate(y.value, [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2], [0, 1, 0], Extrapolate.CLAMP);
    return {
      opacity: opacity,
    };
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      stickyHeaderIndices={[1]}
    >
      <View style={styles.header}>
        <Animated.View style={[styles.gradient, animatedHeight]} >
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0, y: 1 }}
            colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
          />
        </Animated.View>


        <View style={styles.artistContainer}>
          <Animated.Text style={[styles.artist, animatedOpacity]}>{artist}</Animated.Text>
        </View>
      </View>
      
      <View style={{ zIndex: 1, marginTop: -BUTTON_HEIGHT }}>
        <Header {...{ y, artist }} />
        <ShufflePlay />
      </View>
      <View style={styles.tracks}>
        {
          tracks.map((track, key) => (
            <Track
              index={key + 1}
              {...{ track, key, artist }}
            />
          ))
        }
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
  },
  header: {
    height: MAX_HEADER_HEIGHT - BUTTON_HEIGHT,
  },
  gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  artist: {
    textAlign: "center",
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  tracks: {
    paddingTop: 32,
    backgroundColor: "black",
  },
});
