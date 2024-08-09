import React, { useEffect, useState, createContext, useContext } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";

const ResponsiveContext = createContext({} as any);

const ResponsiveComponent = ({ source, color, intro, children }: any) => {
  const defaultAspectRatio = 16 / 9;
  const defaultScreenWidth = 1920;
  const defaultScreenHeight = 1080;

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );
  const [aspectRatio, setAspectRatio] = useState(screenWidth / screenHeight);
  const [padWidth, setPadWidth] = useState(0);
  const [padHeight, setPadHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(screenWidth);
  const [viewportHeight, setViewportHeight] = useState(screenHeight);
  const [scaleFactor, setScaleFactor] = useState(
    Math.min(
      screenWidth / defaultScreenWidth,
      screenHeight / defaultScreenHeight
    )
  );
  const [paddingHorizontal, setPaddingHorizontal] = useState(padWidth);
  const [paddingVertical, setPaddingVertical] = useState(padHeight);

  const updateDimensions = () => {
    const newScreenWidth = Dimensions.get("window").width;
    const newScreenHeight = Dimensions.get("window").height;
    const newAspectRatio = newScreenWidth / newScreenHeight;
    const newPadWidth =
      newAspectRatio < defaultAspectRatio
        ? 0
        : newScreenWidth - defaultAspectRatio * newScreenHeight;
    const newPadHeight =
      newAspectRatio > defaultAspectRatio
        ? 0
        : newScreenHeight - (newScreenWidth * 1) / defaultAspectRatio;
    const newViewportWidth = newScreenWidth - newPadWidth;
    const newViewportHeight = newScreenHeight - newPadHeight;
    const newScaleFactor = Math.min(
      newScreenWidth / defaultScreenWidth,
      newScreenHeight / defaultScreenHeight
    );
    const newPaddingHorizontal =
      newAspectRatio > defaultAspectRatio ? newPadWidth / 2 : 0;
    const newPaddingVertical =
      newAspectRatio < defaultAspectRatio ? newPadHeight / 2 : 0;

    setScreenWidth(newScreenWidth);
    setScreenHeight(newScreenHeight);
    setAspectRatio(newAspectRatio);
    setPadWidth(newPadWidth);
    setPadHeight(newPadHeight);
    setViewportWidth(newViewportWidth);
    setViewportHeight(newViewportHeight);
    setScaleFactor(newScaleFactor);
    setPaddingHorizontal(newPaddingHorizontal);
    setPaddingVertical(newPaddingVertical);
  };

  useEffect(() => {
    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
    const o = await ScreenOrientation.getOrientationAsync();
  };

  useEffect(() => {
    Dimensions.addEventListener("change", updateDimensions);
    // Initial update
    updateDimensions();
  }, []);

  const h = (value: number) => {
    return (viewportHeight * value) / 1080;
  };

  const w = (value: number) => {
    return (viewportWidth * value) / 1920;
  };

  const s = (value: number) => {
    return value * scaleFactor;
  };

  const contextValue = {
    h,
    w,
    s,
    screenWidth,
    screenHeight,
    aspectRatio,
    padWidth,
    padHeight,
    viewportWidth,
    viewportHeight,
    scaleFactor,
  };

  return (
    <ResponsiveContext.Provider value={contextValue}>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        {aspectRatio < 1.5 ? (
          <Text style={styles.text}>Rotate your screen</Text>
        ) : (
          <>
            <ImageBackground
              source={source}
              style={{
                paddingHorizontal: paddingHorizontal,
                paddingVertical: paddingVertical,
                backgroundColor: color ?? "white",
                width: screenWidth,
                height: screenHeight,
              }}
            >
              {intro && (
                <View
                  style={{
                    backgroundColor: "black",
                    width: screenWidth,
                    height: screenWidth/2,
                    maxHeight: 300,
                    position: "absolute",
                    bottom: -100,
                    transform: [{ rotate: "-3deg" }],
                    left: 0, // Align to the left edge
                    right: 0,
                  }}
                />
              )}

              {children}
            </ImageBackground>
          </>
        )}
      </View>
    </ResponsiveContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    // objectFit: "contain",
    overflow: "hidden",
  },
  text: {
    fontSize: 20,
  },
  bottom: {
    backgroundColor: "black",
  },
});

export default ResponsiveComponent;
export const useResponsive = () => useContext(ResponsiveContext);
