import { useMenuStore } from "@/zustand/store";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import {StyleSheet } from "react-native";

const Menu = () => {

  const setMenuVisible = useMenuStore((state) => state.setMenuVisible);
  const setIsPlaying = useMenuStore((state) => state.play);
  const paused = useMenuStore((state) => state.paused);
  const setPaused = useMenuStore((state) => state.setPaused);

  const handleMenu = () => {
    if (!paused) {
      setIsPlaying(false);
    }
  }

  return (
    <>
      <Entypo
        name="menu"
        size={40}
        style={styles.controlButton}
        color="black"
        onPress={() => {router.push("/menu"),handleMenu() , setMenuVisible(true)}}
      />
    </>
  );
};
const styles = StyleSheet.create({

  controlButton: {
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 30,
  },
});

export default Menu;
