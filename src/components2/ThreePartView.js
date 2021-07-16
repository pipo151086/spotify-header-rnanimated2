import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    useAnimatedScrollHandler,
    useSharedValue,
    useDerivedValue
} from "react-native-reanimated";

import { MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT } from "../components/Model";
import Track from "../components/Track";
import ShufflePlay, { BUTTON_HEIGHT } from "../components/ShufflePlay";
import Header from "../components/Header";
import Cover from '../components/Cover'

export default ({ album }) => {
    const { artist, tracks } = album;
    const y = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        console.log(JSON.stringify(event));
        y.value = event.contentOffset.y;
    });

    const yProp = useDerivedValue(() => {
        return y.value
    });

    const animatedHeight = useAnimatedStyle(() => {
        const heightTmp = interpolate(y.value, [-MAX_HEADER_HEIGHT, -32], [0, MAX_HEADER_HEIGHT + 32], Extrapolate.CLAMP);
        return {
            height: heightTmp,
        };
    });

    const topValueHeader = useAnimatedStyle(() => {
        const topHeaderInt = interpolate(y.value, [0, MAX_HEADER_HEIGHT], [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT - 32], Extrapolate.CLAMP);
        return {
            transform: [{ translateY: topHeaderInt }]
        }
    });

    const animatedOpacity = useAnimatedStyle(() => {
        const opacity = interpolate(y.value, [-MAX_HEADER_HEIGHT + 55, 0, MAX_HEADER_HEIGHT - 55], [0, 1, 0], Extrapolate.CLAMP);
        return {
            opacity: opacity,
        };
    });

    return (
        <>
            <Cover y={yProp} album={album} />
            <Animated.ScrollView
                overScrollMode={"always"}
                onScroll={scrollHandler}
                style={{ ...styles.container, marginTop: 0 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                stickyHeaderIndices={[1]}
                flexGrow={1}
                scrollToOverflowEnabled={true}
            >
                <>
                    <View style={styles.header}>
                        <Animated.View style={[styles.gradient, animatedHeight]} >
                            <LinearGradient
                                style={StyleSheet.absoluteFill}
                                start={{ x: 0, y: 0.3 }}
                                end={{ x: 0, y: 1 }}
                                colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
                            />
                            <View style={styles.artistContainer}>
                                <Animated.Text style={[styles.artist, animatedOpacity]}>{artist}</Animated.Text>
                            </View>
                        </Animated.View>
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
                </>
            </Animated.ScrollView >

            <Animated.View style={[{
                zIndex: 1,
                //marginTop: -BUTTON_HEIGHT,
                marginTop: 0,
                position: "absolute",
                width: "100%"
            }, topValueHeader]}>
                <Header y={yProp} artist={artist} />
                <ShufflePlay />
            </Animated.View>
        </>
    )
}


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
        bottom: -140
    },
    tracks: {
        paddingTop: 32,
        backgroundColor: "black",
    },
});
