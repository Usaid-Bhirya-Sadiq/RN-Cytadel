import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const ResponsiveComponent = () => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateDimensions);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen Width: {screenWidth}</Text>
      <Text style={styles.text}>Screen Height: {screenHeight}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f0f0f0"
  },
  text: {
    fontSize: 20,
  },
});

export default ResponsiveComponent;
