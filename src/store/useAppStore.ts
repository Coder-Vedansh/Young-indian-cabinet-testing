import { create } from 'zustand';

interface ChatState {
  activeChannel: string;
  setActiveChannel: (channel: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface AppState {
  chat: ChatState;
}

export const useAppStore = create<AppState>((set) => ({
  chat: {
    activeChannel: 'general',
    setActiveChannel: (channel) => set((state) => ({ chat: { ...state.chat, activeChannel: channel } })),
    isSidebarOpen: true,
    toggleSidebar: () => set((state) => ({ chat: { ...state.chat, isSidebarOpen: !state.chat.isSidebarOpen } })),
  }
}));
