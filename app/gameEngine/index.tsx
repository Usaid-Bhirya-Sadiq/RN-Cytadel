import { useState, useEffect } from "react";
import {Platform, StyleSheet, View } from "react-native";
import ResponsiveComponent from "../utils/ResponsiveProvider";
import ImageCarousel from "@/components/dial2/dial2";
import bg from "../../assets/images/cytadel/bright pixel interior zoomed in day time.webp";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Foundation from "@expo/vector-icons/Foundation";
import { Audio } from "expo-av";
import Menu from "@/components/menu/Menu";
import data from "@/components/dial2/testDial.json";
import { HomeScreen } from "../introduction";
import { router } from "expo-router";

const Game = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [skip, setSkip] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentScene, setCurrentScene] = useState(data.scenes[0]);


  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/button-click.mp3")
    );
    await sound.playAsync();
  };

  const togglePlayPause = async () => {
    setIsPlaying((prevState) => !prevState);
    await playSound();
  };

  const handleSkip = async () => {
    setSkip(true);
    await playSound();
  };

  const handleFullScreen = async () => {
    const element = document.documentElement;
    if (!isFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullScreen(false);
    }
    await playSound();
  };

  useEffect(() => {
    if (currentSceneIndex < data.scenes.length) {
      setCurrentScene(data.scenes[currentSceneIndex]);
    }
  }, [currentSceneIndex]);

  const handleSceneEnd = () => {
    if (currentSceneIndex < data.scenes.length - 1) {
      setCurrentSceneIndex((prevIndex) => prevIndex + 1);
    }

    else {
      router.navigate("/")
    }
  };

  const renderScene = () => {
    switch (currentScene.type) {
      case "dialogue":
        return (
          <ImageCarousel
            isPlaying={isPlaying}
            skip={skip}
            setSkip={setSkip}
            onEnd={handleSceneEnd}
          />
        );
      case "introduction":
        return (
          <HomeScreen
            char={currentScene?.char}
            duration={currentScene?.time}
            onEnd={handleSceneEnd}
            isPlaying={isPlaying}
            skip={skip}
            setSkip={setSkip}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isMenuVisible) {
      if (isPlaying) setIsPlaying(false);
    }
    else {
      
      setIsPlaying(true);
    }
  }, [isMenuVisible]);

  return (
    <View style={{ flex: 1 }}>
      {renderScene()}
      <View style={styles.controls}>
        <Menu set={setIsMenuVisible} />
        <AntDesign
          style={styles.controlButton}
          name={isPlaying ? "pausecircleo" : "playcircleo"}
          size={40}
          color="black"
          onPress={togglePlayPause}
        />
        {isPlaying === true ? (
          <AntDesign
            style={[styles.controlButton, { opacity: 1 }]}
            name="arrowright"
            size={40}
            color="black"
            onPress={handleSkip}
          />
        ) : (
          <AntDesign
            style={[styles.controlButton, { opacity: 0.5, cursor: "auto" }]}
            name="arrowright"
            size={40}
            color="black"
          />
        )}

        {Platform.OS === "web" && (
          <Foundation
            style={styles.controlButton}
            name={isFullScreen ? "arrows-compress" : "arrows-expand"}
            size={40}
            color="black"
            onPress={handleFullScreen}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  controls: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "column",
    alignItems: "flex-end",
    zIndex: 1000, // Ensure the controls are always on top
  },
  controlButton: {
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 30,
  },
});

const Page = () => {
  return (
    <ResponsiveComponent source={bg}>
      <Game />
    </ResponsiveComponent>
  );
};

export default Page;
