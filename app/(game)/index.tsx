// import * as ScreenOrientation from "expo-screen-orientation";
// import React, { useEffect, useState, useRef } from "react";
// import {
//   ImageBackground,
//   View,
//   StyleSheet,
//   Image,
//   Animated,
//   Button,
//   Pressable,
//   Text,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import bg from "../../assets/images/cytadel/bright pixel interior zoomed in day time.webp";
// import matt from "../../assets/images/cytadel/matt/matt_happy.webp";
// import simon from "../../assets/images/cytadel/simon/simon_happy.webp";
// // import dialouge1 from "../../assets/images/cytadel/dialouge/Screenshot 2024-06-04 152948.png";
// import dialouge2 from "../../assets/images/cytadel/dialouge/Screenshot 2024-06-04 154129.png";
// import dialouge3 from "../../assets/images/cytadel/dialouge/Screenshot 2024-06-04 172529.png";
// import dialouge4 from "../../assets/images/cytadel/dialouge/Screenshot 2024-06-04 172553.png";
// import { router } from "expo-router";
// import Dialogue1 from "@/components/dialogues/dialogue1";
// import dialoguesD from "@/components/dialogues/dialogues.json";
// import imagePaths from "@/constants/paths";


// export default function Demo() {
//   const [orientation, setOrientation] = useState(1);
//   const [showDialogue, setShowDialogue] = useState(false);
//   const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
//   const dialoguePosition = useRef(new Animated.Value(-200)).current;


//   const OtherComponent = React.lazy(() => import('../../assets/images/cytadel/dialouge/Screenshot 2024-06-04 152948.png'));




// const dialogues = [
//     { image: dialoguesD[0].image, disappearOnTime: true },
//     { image: dialoguesD[1].image, disappearOnTime: true },
//     { image: dialoguesD[2].image, disappearOnTime: false },
//     { image: dialoguesD[3].image, disappearOnTime: true },
// ]

//   useEffect(() => {
//     lockOrientation();
//   }, []);

//   const lockOrientation = async () => {
//     await ScreenOrientation.lockAsync(
//       ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
//     );
//     const o = await ScreenOrientation.getOrientationAsync();
//     setOrientation(o);
//   };

//   useEffect(() => {
//     const animateDialogue = () => {
//       setShowDialogue(true);
//       Animated.timing(dialoguePosition, {
//         toValue: 0,
//         duration: 1000,
//         useNativeDriver: true,
//       }).start(() => {
//         if (dialogues[currentDialogueIndex].disappearOnTime) {
//           setTimeout(() => {
//             setShowDialogue(false);
//             dialoguePosition.setValue(-200);

//             if (currentDialogueIndex === dialogues.length - 1) {
//               router.navigate("(tabs)");
//             } else {
//               setCurrentDialogueIndex((prevIndex) => prevIndex + 1);
//             }
//           }, 1000);
//         }
//       });
//     };

//     if (dialogues[currentDialogueIndex].disappearOnTime) {
//       const interval = setInterval(animateDialogue, 5000);
//       animateDialogue();

//       return () => clearInterval(interval);
//     } else {
//       animateDialogue();
//     }
//   }, [dialoguePosition, currentDialogueIndex]);

//   const handleButtonClick = () => {
//     if (!dialogues[currentDialogueIndex].disappearOnTime) {
//       setShowDialogue(false);
//       dialoguePosition.setValue(-200);
//       setCurrentDialogueIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const insets = useSafeAreaInsets();

//   return (
//     <View
//       style={{
//         paddingTop: insets.top,
//         paddingBottom: insets.bottom,
//         paddingLeft: insets.left,
//         paddingRight: insets.right,
//         overflow: "hidden",
//       }}
//     >
//       <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
//         <View style={styles.imageContainer}>
//           <Image source={simon} style={styles.charImg1} resizeMode="contain" />
//         </View>


//         <View style={styles.imageContainer}>
//           <Image source={matt} style={styles.charImg2} resizeMode="contain" />
//           {showDialogue && (
//             <Animated.Image
//                 source={{uri: (dialogues[currentDialogueIndex]).image}}
//                 style={[styles.dia, { transform: [{ translateY: dialoguePosition }] }]}
//                 resizeMode="contain"
//             />
//         //     <Animated.View style={[styles.dia, { transform: [{ translateY: dialoguePosition }] },
//         // ]}>
//         //     <Dialogue1
//         //       dialouge1={dialogues[currentDialogueIndex].image}
//         //       disappearOnTime={dialogues[currentDialogueIndex].disappearOnTime}
//         //     />
//         //     </Animated.View>
//           )}
//           <Pressable onPress={handleButtonClick} style={{ top: -80 }}>
//             <Text style={{ color: "#fff", fontSize: 56 }}>Next</Text>
//           </Pressable>

//           {/* )} */}
//         </View>
//       </ImageBackground>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
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
//   charImg1: {
//     width: "100%",
//     height: "100%",
//     transform: [{ scaleX: -1 }],
//   },
//   charImg2: {
//     width: "100%",
//     height: "100%",
//   },
//   dia: {
//     width: "40%",
//     height: "40%",
//     position: "absolute",
//   },
//   text: {
//     color: "white",
//     fontSize: 42,
//     lineHeight: 84,
//     fontWeight: "bold",
//     textAlign: "center",
//     backgroundColor: "#000000c0",
//   },
// });


import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import bg from "../../assets/images/cytadel/bright pixel interior zoomed in day time.webp";
import matt from "../../assets/images/cytadel/matt/matt_happy.webp";
import simon from "../../assets/images/cytadel/simon/simon_happy.webp";
import Dialogue from "@/components/dialogues/dialogue1";
import dialoguesData from "@/components/dialogues/dialogues.json";

export default function Demo() {
  const [orientation, setOrientation] = useState(1);

  useEffect(() => {
    lockOrientation();
  }, []);

  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
    const o = await ScreenOrientation.getOrientationAsync();
    setOrientation(o);
  };

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        overflow: "hidden",
      }}
    >
      <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
        <View style={styles.imageContainer}>
          <Image source={simon} style={styles.charImg1} resizeMode="contain" />
        </View>

        <View style={styles.imageContainer}>
          <Image source={matt} style={styles.charImg2} resizeMode="contain" />
          <View style={styles.dia}>
          <Dialogue dialogues={dialoguesData}/>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  charImg1: {
    width: "100%",
    height: "100%",
    transform: [{ scaleX: -1 }],
  },
  charImg2: {
    width: "100%",
    height: "100%",
  },
    dia: {
        // width: 100,
        // height: 100,
        position: "absolute",
    },
});
