// import React, { useEffect, useRef, useState } from "react";
// import { Animated, StyleSheet, Pressable, Text, View, Alert } from "react-native";
// import { router } from "expo-router";
// import dialoguesData from "./dialogues.json";
// const Dialogue = () => {
//   const [dialogues, setDialogues] = useState([]);
//   const [showDialogue, setShowDialogue] = useState(false);
//   const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
//   const dialoguePosition = useRef(new Animated.Value(-200)).current;

//   useEffect(() => {
//     setDialogues(dialoguesData as never[]);

//     const animateDialogue = () => {
//       setShowDialogue(true);
//       Animated.timing(dialoguePosition, {
//         toValue: 0,
//         duration: 1000,
//         useNativeDriver: true,
//     }).start(() => {
//         if ((dialogues[currentDialogueIndex] as any)?.disappearOnTime) {
//             setTimeout(() => {
//                 setShowDialogue(false);
//                 dialoguePosition.setValue(-200);

//                 if (currentDialogueIndex === dialogues.length - 1) {
//                     router.navigate("(tabs)");
//                 } else {
//                     setCurrentDialogueIndex((prevIndex) => prevIndex + 1);
//                 }
//             }, 1000);
//         }
//     });
//     };

//     if ((dialogues[currentDialogueIndex] as any)?.disappearOnTime) {
//       const interval = setInterval(animateDialogue, 5000);
//       animateDialogue();

//       return () => clearInterval(interval);
//     } else {
//       animateDialogue();
//     }
//   }, [dialoguePosition, currentDialogueIndex, dialogues]);

//   const handleButtonClick = () => {
//     if (!(dialogues[currentDialogueIndex] as any)?.disappearOnTime) {
//       setShowDialogue(false);
//       dialoguePosition.setValue(-200);
//       setCurrentDialogueIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {showDialogue && (
//         <View style={styles.dia}>
//           <Pressable onPress={handleButtonClick}>
//             <Animated.Image
//               source={(dialogues[currentDialogueIndex] as any)?.image}
//               style={[
//                 styles.dia,
//                 { transform: [{ translateY: dialoguePosition }] },
//               ]}
//               resizeMode="contain"
//             />
//           </Pressable>
//           <Text> 
//             {currentDialogueIndex}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   dialogue: {
//     position: "absolute",
//   },
//   dia: {
//     width: 300,
//     height: 300,
//     position: "absolute",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 56,
//   },
// });

// export default Dialogue;

import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Pressable, View, Text } from "react-native";
import { Audio } from 'expo-av';
import { router } from "expo-router";

const Dialogue = ({ dialogues } : {dialogues: Object[]}) => {
  const [showDialogue, setShowDialogue] = useState(false);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const dialoguePosition = useRef(new Animated.Value(-200)).current;
  const [sound, setSound] = useState(null);

  const playSound = async (soundPath: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync({uri: soundPath}, { shouldPlay: true });
      setSound(sound as any);
  
    }

    catch (error) {
      console.log('Error Loading Sound: ', error);
    }

    await (sound as any)?.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          (sound as any).unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    const animateDialogue = async () => {
      setShowDialogue(true);
      Animated.timing(dialoguePosition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(async () => {
        await playSound((dialogues[currentDialogueIndex] as any)?.sound);

        if ((dialogues[currentDialogueIndex] as any)?.disappearOnTime) {
          setTimeout(() => {
            setShowDialogue(false);
            dialoguePosition.setValue(-200);

            if (currentDialogueIndex === dialogues.length - 1) {
              router.navigate("(tabs)");
            } else {
              setCurrentDialogueIndex((prevIndex) => prevIndex + 1);
            }
          }, 1000);
        }
      });
    };

    if ((dialogues[currentDialogueIndex] as any)?.disappearOnTime) {
      const interval = setInterval(animateDialogue, 5000);
      animateDialogue();

      return () => clearInterval(interval);
    } else {
      animateDialogue();
    }
  }, [dialoguePosition, currentDialogueIndex, dialogues]);

  const handleButtonClick = () => {
    console.log('Button Clicked');
    if (!(dialogues[currentDialogueIndex] as any)?.disappearOnTime) {
      console.log('Inside if');
      setShowDialogue(false);
      console.log('Set Show Dialogue');
      dialoguePosition.setValue(-200);
      console.log('Set Dialogue Position');
      setCurrentDialogueIndex((prevIndex) => prevIndex + 1);
      console.log('Set Current Dialogue Index');
    }
  };

  return (
    <View style={styles.container}>
      {showDialogue && (
        <View style={styles.dia}>
          <Pressable onPress={handleButtonClick} style={styles.dia}>
            <Animated.Image
              source={{ uri: (dialogues[currentDialogueIndex] as any)?.image }}
              style={[
                styles.dia,
                { transform: [{ translateY: dialoguePosition }] },
              ]}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dia: {
    width: 300,
    height: 300,
    position: "absolute",
  },
  
});

export default Dialogue;
