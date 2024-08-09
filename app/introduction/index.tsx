// import {
//   Image,
//   StyleSheet,
//   Platform,
//   View,
//   Text,
//   ImageBackground,
//   Animated,
// } from "react-native";
// import img1 from "@/assets/images/cytadel/bright pixel interior zoomed in day time.webp";
// import SvgBg from "@/components/svgs/seasonCard.svg";

// import ResponsiveComponent, {
//   useResponsive,
// } from "../utils/ResponsiveProvider";
// import { useEffect, useRef } from "react";
// import textBgW from "@/assets/images/cytadel/backgrounds/TextBg White.png";
// import textBgR from "@/assets/images/cytadel/backgrounds/TextBg Red.png";

// function HomeScreen() {
//   const { h, w, viewportWidth, viewportHeight } = useResponsive();

//   const translateY = useRef(new Animated.Value(-viewportHeight)).current; // Start off-screen
//   const translateY2 = useRef(new Animated.Value(viewportHeight)).current; // Start off-screen

//   useEffect(() => {
//     Animated.timing(translateY, {
//       toValue: 60, // Move to the middle
//       duration: 1000, // Duration of the animation
//       useNativeDriver: true, // Use native driver for better performance
//     }).start();

//     Animated.timing(translateY2, {
//       toValue: 200, // Move to the middle
//       duration: 1000, // Duration of the animation
//       useNativeDriver: true, // Use native driver for better performance
//     }).start();
//   }, [viewportHeight, translateY]);

//   return (
//     <View
//       style={{
//         width: viewportWidth,
//         height: viewportHeight,
//         alignItems: "flex-end",
//       }}
//     >
//       <View
//         style={{
//           width: "95%",
//           height: "100%",
//           justifyContent: "center",
//           display: "flex",
//           flexDirection: "row",
//         }}
//       >
//         <Animated.View
//           style={{
//             transform: [{ translateY: translateY }],
//             width: w(900),
//             height: h(700),
//             zIndex: 1,
//           }}
//         >
//           <ImageBackground
//             source={textBgW}
//             style={{
//               width: "100%",
//               height: "100%",
//             }}
//           >
//             <Text
//               style={{
//                 fontFamily: "Thunder",
//                 fontWeight: "700",
//                 fontSize: w(200),
//                 color: "#E4637C",
//                 marginLeft: "10%",
//               }}
//             >
//               Race against time
//             </Text>
//           </ImageBackground>
//         </Animated.View>

//         <Animated.View
//           style={{
//             transform: [{ translateY: translateY2 }],
//             width: w(900),
//             height: h(700),
//             marginLeft: "-2%",
//           }}
//         >
//           <ImageBackground
//             source={textBgR}
//             style={{
//               width: "100%",
//               height: "100%",
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Text
//               style={{
//                 fontFamily: "Thunder",
//                 fontWeight: "700",
//                 fontSize: w(50),
//                 color: "black",
//                 marginLeft: "10%",
//               }}
//             >
//               As a powerhouse in the advertising world, Bright Pixel is used to
//               the limelight. But envy and cutthroat competition expose the
//               company to sinister cyberattacks leaving it no option but to
//               intensify its cybersecurity efforts, bracing for battles unseen
//               ...{" "}
//             </Text>
//           </ImageBackground>
//         </Animated.View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   scrollView: {
//     flexDirection: "row",
//     borderRadius: 12,
//   },
//   card: {
//     width: 200,
//     height: 150,
//     backgroundColor: "#f0f0f0",
//     marginHorizontal: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 8,
//   },
//   cardText: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },

//   image: {
//     width: "100%",
//     height: "100%",
//     flexDirection: "row",
//   },
//   imageContainer: {
//     flex: 1,
//     aspectRatio: 1,
//     overflow: "hidden",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100%",
//   },
//   dia: {
//     position: "absolute",
//   },
// });

// const App = () => {
//   return (
//     <ResponsiveComponent color={"purple"}>
//       <HomeScreen />
//     </ResponsiveComponent>
//   );
// };

// export default App;

import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Animated,
} from "react-native";
import img1 from "@/assets/images/cytadel/bright pixel interior zoomed in day time.webp";
import introSim from "@/assets/images/cytadel/backgrounds/introSimon.png";
import ResponsiveComponent, { useResponsive } from "../utils/ResponsiveProvider";

export function HomeScreen(props: any) {
  const { h, w, viewportWidth, viewportHeight } = useResponsive();
  const translateY = useRef(new Animated.Value(-viewportHeight)).current;
  const translateY2 = useRef(new Animated.Value(viewportHeight)).current;
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const char = props.char;
  const duration = props.duration;
  const { isPlaying, skip, setSkip, onEnd } = props;

  useEffect(() => {
    const startAnimations = () => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 60,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY2, {
          toValue: 200,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setAnimationCompleted(true);
      });
    };

    if (isPlaying) {
      startAnimations();
    } else {
      translateY.stopAnimation();
      translateY2.stopAnimation();
    }
  }, [isPlaying, viewportHeight, translateY, translateY2]);

  useEffect(() => {
    if (skip ) {
      onEnd();
      setSkip(false);
    }
  }, [skip, onEnd, setSkip]);

  useEffect(() => {
    if(isPlaying) {
      const timer = setTimeout(() => {
        onEnd();
      }, duration);  

    return () => clearTimeout(timer);

    }

  }, [isPlaying, duration, onEnd]);

  return (
    <View
      style={{
        width: viewportWidth,
        height: viewportHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        zIndex: 2,
      }}
    >
      <View style={{ height: viewportHeight * 0.8 }}>
        <Text
          style={{
            fontSize: w(650),
            fontWeight: "700",
            transform: [{ rotate: "-5deg" }],
            color: "white",
            textShadowColor: "#585858",
            textShadowOffset: { width: 5, height: 5 },
            textShadowRadius: 10,
            fontFamily: "Thunder",
          }}
        >
          {char}
        </Text>
      </View>

      <View style={{ height: viewportHeight * 0.2 }}>
        <Text
          style={{
            fontSize: w(650),
            fontWeight: "700",
            transform: [{ rotate: "-5deg" }],
            color: "white",
            textShadowColor: "#585858",
            textShadowOffset: { width: 5, height: 5 },
            textShadowRadius: 10,
            fontFamily: "Thunder",
          }}
        >
          {char}
        </Text>
      </View>
    </View>
  );
}


const Introduction = () => {
  return (
    <ResponsiveComponent source={introSim} intro={true}>
      <HomeScreen />
    </ResponsiveComponent>
  );
};

export default Introduction;
