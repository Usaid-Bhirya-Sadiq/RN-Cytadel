// import { useState, useEffect } from 'react';
// import { Dimensions } from 'react-native';

// class ResponsiveStore {
//   static defaultAspectRatio = 16 / 9;
//   static defaultScreenWidth = 1920;
//   static defaultScreenHeight = 1080;

//   static screenWidth: number;
//   static screenHeight: number;
//   static aspectRatio: number;
//   static padWidth: number;
//   static padHeight: number;
//   static viewportWidth: number;
//   static viewportHeight: number;
//   static scaleFactor: number;

//   static initialize(width: number, height: number) {
//     this.screenWidth = width;
//     this.screenHeight = height;
//     this.aspectRatio = this.screenWidth / this.screenHeight;
//     this.padWidth = this.aspectRatio < this.defaultAspectRatio
//       ? 0
//       : this.screenWidth - (this.defaultAspectRatio * this.screenHeight);
//     this.padHeight = this.aspectRatio > this.defaultAspectRatio
//       ? 0
//       : this.screenHeight - (this.screenWidth * 1 / this.defaultAspectRatio);
//     this.viewportWidth = this.screenWidth - this.padWidth;
//     this.viewportHeight = this.screenHeight - this.padHeight;
//     this.scaleFactor = Math.min(
//       this.screenWidth / this.defaultScreenWidth,
//       this.screenHeight / this.defaultScreenHeight
//     );
//   }
// }

// const useResponsiveness = () => {
//   const [dimensions, setDimensions] = useState(Dimensions.get('window'));

//   useEffect(() => {
//     const onChange = ({ window }: { window: { width: number, height: number } }) => {
//       setDimensions(window as any);
//       ResponsiveStore.initialize(window.width, window.height);
//     };

//     Dimensions.addEventListener('change', onChange);

//     // Initialize with current dimensions
//     ResponsiveStore.initialize(dimensions.width, dimensions.height);

//   }, [dimensions]);

//   const h = (value: number) => {
//     return ResponsiveStore.viewportHeight * value / 1080;
//   };

//   const sp = (value: number) => {
//     return value * ResponsiveStore.scaleFactor;
//   };

//   const w = (value: number) => {
//     return ResponsiveStore.viewportWidth * value / 1920;
//   };

//   return { h, sp, w };
// };

// export default useResponsiveness;

const ResponsiveStore = () => {
  const defaultAspectRatio = 16 / 9;
  const defaultScreenWidth = 1920;
  const defaultScreenHeight = 1080;
};
