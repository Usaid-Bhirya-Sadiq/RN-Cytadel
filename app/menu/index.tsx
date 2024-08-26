import { useMenuStore } from "@/zustand/store";
import { router } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

const MenuPage = () => {
  const paused = useMenuStore((state) => state.paused);
  const setIsPlaying = useMenuStore((state) => state.play);

  const handleBack = () => {
    if (!paused) {
      setIsPlaying(true);
    }
  };
  return (
    <>
      <View style={styles.overlay}>
        <Button
          title="Close"
          onPress={() => {
            handleBack();
            router.back();
          }}
        />
      </View>
    </>
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
});

export default MenuPage;
