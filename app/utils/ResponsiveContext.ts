import React, { createContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export const ResponsiveContext = React.createContext({
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    aspectRatio: Dimensions.get('window').width / Dimensions.get('window').height,
    padWidth: 0,
    padHeight: 0,
    viewportWidth: Dimensions.get('window').width,
    viewportHeight: Dimensions.get('window').height,
    scaleFactor: 1,
});