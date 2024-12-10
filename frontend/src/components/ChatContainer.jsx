import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import MessageHeader from "./MessageHeader";
import MessageInput from "./MessageInput";
import AvatarImage from "../assets/avatar.png";
import MessageSkeleton from "./skeleton/MessageSkeleton";

const ChatContainer = () => {
  const messageEndRef = useRef(null);
  const {
    messages,
    isMessageLoading,
    getMessages,
    selectedUser,
    subscribeToMessage,
    unsubscribeFromMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessage();
    return () => unsubscribeFromMessage();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessage,
    unsubscribeFromMessage,
  ]);

  console.log(`the message sending loading is ${isMessageLoading}`);

  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <MessageHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <MessageHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message?._id}
            className={`chat ${
              message?.senderId?.toString() === authUser.user?._id?.toString()
                ? "chat-end"
                : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message?.senderId?.toString() ===
                    authUser.user?._id?.toString()
                      ? authUser.user?.profilePic?.url || AvatarImage
                      : selectedUser?.profilePic?.url || AvatarImage
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {message?.createdAt}
              </time>
            </div>
            <div className="chat-bubble flex flex-col ">
              {message?.image?.url && (
                <img
                  src={message?.image?.url}
                  alt="attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message?.text && <p>{message?.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
