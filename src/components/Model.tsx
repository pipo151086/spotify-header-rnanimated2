import { Dimensions, StatusBar } from "react-native";
//import Constants from "expo-constants";

const { height } = Dimensions.get("window");
const φ = (1 + Math.sqrt(5)) / 2;

//export const MIN_HEADER_HEIGHT = 64 + Constants.statusBarHeight;
export const MIN_HEADER_HEIGHT = 64 + StatusBar.currentHeight;
export const MAX_HEADER_HEIGHT = height * (1 - 1 / φ);
export const HEADER_DELTA = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;