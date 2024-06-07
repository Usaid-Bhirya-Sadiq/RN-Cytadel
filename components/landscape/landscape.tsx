import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from '@/constants/respon';

const LandscapeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rotate your screen to landscape.</Text>
      <Svg width={responsiveWidth(250)} height={responsiveHeight(250)} viewBox="0 0 24 24">
        <Path d="M12 2L3 21h18L12 2z" fill="#000" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: responsiveFontSize(50),
    color: '#333333',
    textAlign: 'center',
    margin: responsiveHeight(50),
  },
});

export default LandscapeScreen;
