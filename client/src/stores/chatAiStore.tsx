
import { create } from 'zustand';

interface Message {
    sender: 'ai' | 'user';
    text: string;
}

interface ChatAiStore {
    messages: Message[];
    addMessage: (message: Message) => void;
}

export const useChatAiStore = create<ChatAiStore>((set) => ({
    messages: [
        { sender: 'ai', text: 'Xin chào, tôi có thể giúp gì cho bạn?' },
    ],
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message],
    })),
}));


