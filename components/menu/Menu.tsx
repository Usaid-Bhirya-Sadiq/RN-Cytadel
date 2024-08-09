import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import {StyleSheet } from "react-native";

const Menu = (props: any) => {

    const set= props.set

  return (
    <>
      <Entypo
        name="menu"
        size={40}
        style={styles.controlButton}
        color="black"
        onPress={() => {router.push("/menu"), set(true)}}
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
