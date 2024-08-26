import {create} from 'zustand';

type MenuStore = {
    isPlaying: boolean;
    isMenuVisible: boolean;
    skip: boolean;
    isFullScreen: boolean;
    paused: boolean;

    play : (value: boolean) => void;
    setMenuVisible: (value: boolean) => void;
    setSkip: (value: boolean) => void;
    setFullScreen: (value: boolean) => void;
    setPaused: (value: boolean) => void;

    
}

export const useMenuStore = create<MenuStore>((set) => ({
    isPlaying:true,
    isMenuVisible: false,
    skip: false,
    isFullScreen: false,
    paused: false,

    play: (value: boolean) => set((state) => ({ isPlaying: value })),
    setMenuVisible: (value: boolean) => set((state) => ({ isMenuVisible: value })),
    setSkip: (value: boolean) => set((state) => ({ skip: value })),
    setFullScreen: (value: boolean) => set((state) => ({ isFullScreen: value })),
    setPaused: (value: boolean) => set((state) => ({ paused: value })),

}));