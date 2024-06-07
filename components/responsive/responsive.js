import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import LandscapeScreen from '../landscape/landscape';
import { ResponsiveStore } from '@/constants/respon';

const ResponsiveWidget = ({ background, children, fNotLandscape = () => {}, fLandscape = () => {} }) => {
  const { width, height } = Dimensions.get('window');
  ResponsiveStore.initialize();

  if (ResponsiveStore.aspectRatio >= 1.5) {
    fNotLandscape();
  } else {
    fLandscape();
  }

  return (
    <View style={styles.container}>
      {background}
      {ResponsiveStore.aspectRatio >= 1.5 ? (
        <View
          style={{
            paddingHorizontal: ResponsiveStore.aspectRatio > defaultAspectRatio ? ResponsiveStore.padWidth / 2 : 0,
            paddingVertical: ResponsiveStore.aspectRatio < defaultAspectRatio ? ResponsiveStore.padHeight / 2 : 0,
          }}
        >
          {children}
        </View>
      ) : (
        <LandscapeScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ResponsiveWidget;
