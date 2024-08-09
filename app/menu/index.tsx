import { router } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

const MenuPage = () => {
  return (
    <>
      <View style={styles.overlay}>
        <Button
          title="Close"
          onPress={() => {
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
