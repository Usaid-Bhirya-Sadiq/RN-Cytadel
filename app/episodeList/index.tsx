import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ImageBackground,
} from "react-native";
import img1 from "@/assets/images/cytadel/bright pixel interior zoomed in day time.webp";

import ResponsiveComponent, {
  useResponsive,
} from "../utils/ResponsiveProvider";
import bg from "../../assets/images/cytadel/backgrounds/seasonCard.webp";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";

function HomeScreen() { 
  const { h, w, s, screenWidth, screenHeight, viewportHeight, viewportWidth } =
    useResponsive(); 
    
  useEffect(() => {
    console.log('Viewport dimensions:', viewportWidth, viewportHeight);
  }, [viewportWidth, viewportHeight]);

  return (
    <View
      style={{
        width: viewportWidth,
        height: viewportHeight,
        alignItems: "flex-end",
      }}
    >
      <View
        style={{ width: "95%", height: "100%", justifyContent: "flex-end" }}
      >
        <ImageBackground
          style={{ width: "100%", height: "90%" }}
          source={bg}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView horizontal={true} style={{ paddingTop: "15%" }} contentContainerStyle={styles.scrollView}>
              <Image
                source={img1}
                style={{ width: 300, height: 200, marginLeft: "3%" }}
              />
            <Image
              source={img1}
              style={{ width: 300, height: 200, marginLeft: "9%" }}
            />
            <Image
              source={img1}
              style={{ width: 300, height: 200, marginLeft: "9%" }}
            />
            <Image
              source={img1}
              style={{ width: 300, height: 200, marginLeft: "9%" }}
            />
            <Image
              source={img1}
              style={{ width: 300, height: 200, marginLeft: "9%" }}
            />
            <Image
              source={img1}
              style={{ width: 300, height: 200, marginLeft: "9%" }}
            />
            <Image
              source={img1}
              style={{ width: 300, height: 200, marginLeft: "9%" }}
            />
            <Image
              source={img1}
              style={{ width: 300, height: 200, marginLeft: "9%" }}
            />
            <Image
              source={img1}
              style={{ width: 300, height: 200, marginLeft: "9%" }}
            />
            <Image
              source={img1}
              style={{ width: 300, height: 200, marginLeft: "9%" }}
            />
            <Image
              source={img1}
              style={{ width: 300, height: 200, marginLeft: "9%" }}
            />
            <Image
              source={img1}
              style={{ width: 300, height: 200, marginLeft: "9%" }}
            />
            </ScrollView>
          </GestureHandlerRootView>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    borderRadius: 12,
  },
  card: {
    width: 200,
    height: 150,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const App = () => {
  return (
    <ResponsiveComponent source={img1}>
      <HomeScreen />
    </ResponsiveComponent>
  );
};

export default App;