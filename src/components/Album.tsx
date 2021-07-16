import * as React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import Content from "./Content";
import Cover from "./Cover";

const { Value } = Animated;

export default ({ album }) => {
  const y = useSharedValue(0);//new Value(0);
  //const y = new Value(0);
  //const yComp = useSharedValue(0);

  return (
    <View style={styles.container}>
      {/*<Cover {...{ y, album }} />*/}
      <Cover y={y} album={album} />
      <Content {...{ y, album }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
