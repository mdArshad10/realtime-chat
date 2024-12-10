import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  isUserLoading: false,
  isMessageLoading: false,
  selectedUser: null,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      //code
      const response = await axiosInstance.get("/messages/users");
      toast.success("get all users");
      set({ users: response.data?.users });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.messages);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);

      set({ messages: response.data?.messages });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.messages);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response");
      console.log(response.data);

      console.log("already exist messages");
      console.log(messages);

      set({ messages: [...messages, response.data.message] });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  },

  subscribeToMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      console.log("the old messages");
      console.log(get().messages);
      console.log("the new message is ");
      console.log(newMessage);

      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
