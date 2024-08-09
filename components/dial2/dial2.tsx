// import React, { useState, useEffect, useRef } from 'react';
// import { View, Image, StyleSheet, Animated, TouchableOpacity, Pressable } from 'react-native';
// // import dialoguesData from "@/components/dialogues/dialogues.json";

// const ImageCarousel = ({ isPlaying, skip, setSkip, dialoguesData }: any) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const translateY = useRef(new Animated.Value(-300)).current; // Initial position above the screen

//   useEffect(() => {
//     let interval: any;
//     if (isPlaying) {
//       interval = setInterval(() => {
//         if (dialoguesData[currentIndex].disappearOnTime) {
//           setCurrentIndex(prevIndex => {
//             const nextIndex = (prevIndex + 1) % dialoguesData.length;
//             animateImage();
//             return nextIndex;
//           });
//         }
//       }, 2000);
//     }

//     return () => clearInterval(interval);
//   }, [isPlaying, currentIndex]);

//   useEffect(() => {
//     if (skip) {
//       setCurrentIndex(prevIndex => {
//         const nextIndex = (prevIndex + 1) % dialoguesData.length;
//         animateImage();
//         return nextIndex;
//       });
//       setSkip(false); // Reset skip state
//     }
//   }, [skip]);

//   const animateImage = () => {
//     translateY.setValue(-300); // Reset to initial position
//     Animated.timing(translateY, {
//       toValue: 0, // Move to the middle
//       duration: 1000, // Animation duration
//       useNativeDriver: true,
//     }).start();
//   };

//   const handlePress = () => {
//     setCurrentIndex(prevIndex => {
//       const nextIndex = (prevIndex + 1) % dialoguesData.length;
//       animateImage();
//       return nextIndex;
//     });
//   };

//   useEffect(() => {
//     animateImage(); // Initial animation
//   }, [currentIndex]);

//   return (
//     <View style={styles.container}>
//       <Animated.View style={{ transform: [{ translateY }] }}>
//         <Pressable 
//           onPress={dialoguesData[currentIndex].disappearOnTime ? () => {} : handlePress}
//         >
//           <Image
//             source={{ uri: dialoguesData[currentIndex].image }}
//             style={[styles.image, { cursor: dialoguesData[currentIndex].disappearOnTime ? 'auto' : 'pointer' }]}
//           />
//         </Pressable>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   image: {
//     width: 300,
//     height: 300,
//     resizeMode: 'cover'
//   }
// });

// export default ImageCarousel;

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Image, StyleSheet, Animated, Pressable } from 'react-native';
// import dialoguesData from "@/components/dialogues/dialogues.json";


// const ImageCarousel = ({ isPlaying, skip, setSkip}: any) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const translateY = useRef(new Animated.Value(-300)).current;

//   useEffect(() => {
//     let interval: any;
//     if (isPlaying) {
//       interval = setInterval(() => {
//         if (dialoguesData[currentIndex].disappearOnTime && currentIndex < dialoguesData.length - 1) {
//           setCurrentIndex(prevIndex => {
//             const nextIndex = prevIndex + 1;
//             animateImage();
//             return nextIndex;
//           });
//         }
//       }, 2000);
//     }

//     return () => clearInterval(interval);
//   }, [isPlaying, currentIndex]);

//   useEffect(() => {
//     if (skip && currentIndex < dialoguesData.length - 1) {
//       setCurrentIndex(prevIndex => {
//         const nextIndex = prevIndex + 1;
//         animateImage();
//         return nextIndex;
//       });
//       setSkip(false);
//     }
//   }, [skip]);

//   const animateImage = () => {
//     translateY.setValue(-300);
//     Animated.timing(translateY, {
//       toValue: 0,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handlePress = () => {
//     if (currentIndex < dialoguesData.length - 1) {
//       setCurrentIndex(prevIndex => {
//         const nextIndex = prevIndex + 1;
//         animateImage();
//         return nextIndex;
//       });
//     }
//   };

//   useEffect(() => {
//     animateImage();
//   }, [currentIndex]);

//   return (
//     <View style={styles.container}>
//       <Animated.View style={{ transform: [{ translateY }] }}>
//         <Pressable 
//           onPress={dialoguesData[currentIndex].disappearOnTime ? () => {} : handlePress}
//         >
//           <Image
//             source={{ uri: dialoguesData[currentIndex].image }}
//             style={[styles.image, { cursor: dialoguesData[currentIndex].disappearOnTime ? 'auto' : 'pointer' }]}
//           />
//         </Pressable>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   image: {
//     width: 300,
//     height: 300,
//     resizeMode: 'cover'
//   }
// });

// export default ImageCarousel;


import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Pressable } from 'react-native';
import dialoguesData from "@/components/dialogues/dialogues.json";


const ImageCarousel = ({ isPlaying, skip, setSkip, onEnd }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateY = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentIndex < dialoguesData.length - 1) {
          if (dialoguesData[currentIndex].disappearOnTime) {
            setCurrentIndex(prevIndex => {
              const nextIndex = prevIndex + 1;
              animateImage();
              return nextIndex;
            });
          }
        } else {
          clearInterval(interval);
          onEnd();
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    if (skip && currentIndex < dialoguesData.length - 1) {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        animateImage();
        return nextIndex;
      });
      setSkip(false);
    } else if (skip && currentIndex >= dialoguesData.length - 1) {
      onEnd();
    }
  }, [skip]);

  const animateImage = () => {
    translateY.setValue(-300);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (currentIndex < dialoguesData.length - 1) {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        animateImage();
        return nextIndex;
      });
    } else {
      onEnd();
    }
  };

  useEffect(() => {
    animateImage();
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Pressable 
          onPress={dialoguesData[currentIndex].disappearOnTime ? () => {} : handlePress}
        >
          <Image
            source={{ uri: dialoguesData[currentIndex].image }}
            style={[styles.image, { cursor: dialoguesData[currentIndex].disappearOnTime ? 'auto' : 'pointer' }]}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover'
  }
});

export default ImageCarousel;
