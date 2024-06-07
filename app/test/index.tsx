// import React, { useEffect, useState } from 'react';
// import { Dimensions, StyleSheet, Text, View } from 'react-native';
// import { Provider } from 'react-redux';
// import store from '../utils/redux/store';

// const ResponsiveComponent = () => {

//   const defaultAspectRatio = 16 / 9;
//   const defaultScreenWidth = 1920;
//   const defaultScreenHeight = 1080;

//   const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
//   const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
//   const [aspectRatio, setAspectRatio] = useState(Number);
//   const [padWidth, setPadWidth] = useState(Number);
//   const [padHeight, setPadHeight] = useState(Number);
//   const [viewportWidth, setViewportWidth] = useState(Number);
//   const [viewportHeight, setViewportHeight] = useState(Number);
//   const [scaleFactor, setScaleFactor] = useState(Number);

//   useEffect(() => {
//     const updateDimensions = () => {
//       setScreenWidth(Dimensions.get('window').width);
//       setScreenHeight(Dimensions.get('window').height);
//       setAspectRatio(screenWidth / screenHeight);
//       setPadWidth(aspectRatio < defaultAspectRatio ? 0 : screenWidth - (defaultAspectRatio * screenHeight));
//       setPadHeight(aspectRatio > defaultAspectRatio ? 0 : screenHeight - (screenWidth * 1 / defaultAspectRatio));
//       setViewportWidth(screenWidth - padWidth);
//       setViewportHeight(screenHeight - padHeight);
//       setScaleFactor(Math.min(screenWidth / defaultScreenWidth, screenHeight / defaultScreenHeight));
//     };

//     Dimensions.addEventListener('change', updateDimensions);
//   }, [screenWidth, screenHeight]);

//   const h = (value: number): number => {
//     return (viewportHeight * value) / 1080;
//   }

//   const w = (value: number): number => {
//     return (viewportWidth * value) / 1920;
//   }

//   const s = (value: number): number => {
//     return value * scaleFactor;
//   }

//   return (
// <View style={styles.container}>
//       {aspectRatio < 1.5 ? (
//         <Text style={styles.text}>Rotate your screen</Text>
//       ) : (
//         <>
//           <Text style={styles.text}>Screen Width: {screenWidth}</Text>
//           <Text style={styles.text}>Screen Height: {screenHeight}</Text>
//           <Text style={styles.text}>Aspect Ratio: {aspectRatio}</Text>
//           <Text style={styles.text}>Pad Width: {padWidth}</Text>
//           <Text style={styles.text}>Pad Height: {padHeight}</Text>
//           <Text style={styles.text}>Viewport Width: {viewportWidth}</Text>
//           <Text style={styles.text}>Viewport Height: {viewportHeight}</Text>
//           <Text style={styles.text}>Scale Factor: {scaleFactor}</Text>
//           <Text style={styles.text}>Responsive Height: {h(100)}</Text>
//           <Text style={styles.text}>Responsive Width: {w(100)}</Text>
//           <Text style={styles.text}>Responsive Scale: {s(100)}</Text>

//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: "#f0f0f0"
//   },
//   text: {
//     fontSize: 20,
//   },
// });

// // export default ResponsiveComponent;

// export default function ResponProvider () {
//   return (
//     <Provider store={store}>
//       <ResponsiveComponent />
//     </Provider>
//   )

// }

// ResponsiveComponent.js

import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { updateDimensions } from "../utils/redux/responsiveSlice";
import store from "../utils/redux/store";

const ResponsiveComponent = () => {

    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateDimension = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
      dispatch(updateDimensions({ screenWidth, screenHeight }));
    };

    Dimensions.addEventListener('change', updateDimension);
  }, [screenWidth, screenHeight]);

    const {
    aspectRatio,
    padWidth,
    padHeight,
    viewportWidth,
    viewportHeight,
    scaleFactor,
  } = useSelector((state) => (state as any).responsive);


  const h = (value: number): number => {
    return (viewportHeight * value) / 1080;
  };

  const w = (value: number): number => {
    return (viewportWidth * value) / 1920;
  };

  const s = (value: number): number => {
    return value * scaleFactor;
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {aspectRatio < 1.5 ? (
          <Text style={styles.text}>Rotate your screen</Text>
        ) : (
          <>
            <Text style={styles.text}>Screen Width: {screenWidth}</Text>
            <Text style={styles.text}>Screen Height: {screenHeight}</Text>
            <Text style={styles.text}>Aspect Ratio: {aspectRatio}</Text>
            <Text style={styles.text}>Pad Width: {padWidth}</Text>
            <Text style={styles.text}>Pad Height: {padHeight}</Text>
            <Text style={styles.text}>Viewport Width: {viewportWidth}</Text>
            <Text style={styles.text}>Viewport Height: {viewportHeight}</Text>
            <Text style={styles.text}>Scale Factor: {scaleFactor}</Text>
            <Text style={styles.text}>Responsive Height: {h(100)}</Text>
            <Text style={styles.text}>Responsive Width: {w(100)}</Text>
            <Text style={styles.text}>Responsive Scale: {s(100)}</Text>
          </>
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
  },
});

export default function ResponProvider() {
  return (
    <Provider store={store}>
      <ResponsiveComponent />
    </Provider>
  );
}
