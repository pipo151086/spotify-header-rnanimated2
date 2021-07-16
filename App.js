import React from 'react';
/*
import type { Node } from 'react';
import Album from "./src/components/Album";
import { Album as AlbumModel } from "./src/components/Model";
*/

//import Album from "./src/components/Album";
import { StatusBar, StyleSheet, View, Text } from "react-native";
import ThreePartView from "./src/components2/ThreePartView";

const album = {
  name: "Remote Control",
  artist: "Jan Blomqvist",
  release: 2016,
  // eslint-disable-next-line global-require
  cover: require("./src/assets/Jan-Blomqvist.jpg"),
  tracks: [
    { name: "Stories Over" },
    { name: "More", artist: "Jan Blomqvist, Elena Pitoulis" },
    { name: "Empty Floor" },
    { name: "Her Great Escape" },
    { name: "Dark Noise" },
    { name: "Drift", artist: "Jan Blomqvist, Aparde" },
    { name: "Same Mistake" },
    { name: "Dancing People Are Never Wrong", artist: "Jan Blomqvist, The Bianca Story" },
    { name: "Back in the Taxi" },
    { name: "Ghosttrack" },
    { name: "Just OK" },
    { name: "The End" },
    { name: "The End" },
    { name: "The End" },
    { name: "The End" },
    { name: "The End" },
  ],
};

const App = () => {

  /* const [ready, setReady] = useState(false);
   useEffect(() => {
     (async () => {
       await Asset.loadAsync(album.cover);
       setReady(true);
     })();
   });
   if (!ready) {
       return <AppLoading />;
     }
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Album {...{ album }} />
    </>
  );*/
  return (
    <>
      <StatusBar barStyle="light-content" />
      {/*<Album {...{ album }} />*/}
      <ThreePartView album={album}></ThreePartView>
    </>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

