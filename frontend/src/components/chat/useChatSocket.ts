import { useEffect, useState } from "react";
import { socket } from "../../apis/socket";
import { axiosInstance } from "../../apis/axios";

export function useChatSocket({
  chatId,
  userId,
  setMessages,
  shouldAutoScrollRef,
  endRef,
}: any) {
  const [showNewMsgBtn, setShowNewMsgBtn] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // delete for everyone 
useEffect(() => {
  const onDeleted = ({ messageId }: any) => {
    setMessages((prev: any[]) =>
      prev.map(m =>
        m._id === messageId
          ? { ...m, isDeleted: true }
          : m
      )
    );
  };

  socket.on("message-deleted", onDeleted);
  return () => { socket.off("message-deleted", onDeleted) };
}, []);

  /* -------- NEW MESSAGE -------- */
  useEffect(() => {
    const onNewMessage = ({ message }: any) => {
      if (
        message?.senderId === chatId ||
        message?.receiverId === chatId
      ) {
        setMessages((prev: any[]) => [...prev, message]);

        if (shouldAutoScrollRef.current) {
          requestAnimationFrame(() =>
            endRef.current?.scrollIntoView({ behavior: "smooth" })
          );
        } else {
          setShowNewMsgBtn(true);
        }
      }
    };

    socket.on("new-message", onNewMessage);
      return () => { socket.off("new-message", onNewMessage) };
  }, [chatId]);

  /* -------- TYPING (FIXED BUG) -------- */
  useEffect(() => {
    const onTyping = ({ from }: any) => {
      if (from === chatId) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1200);
      }
    };

    socket.on("typing", onTyping);
      return () => { socket.off("typing", onTyping) };
  }, [chatId]);

  /* -------- READ RECEIPT -------- */
  useEffect(() => {
    const onMessagesRead = ({ by }: any) => {
      if (by === chatId) {
        setMessages((prev: any[]) =>
          prev.map(m =>
            m.senderId === userId
              ? { ...m, isRead: true }
              : m
          )
        );
      }
    };

    socket.on("messages-read", onMessagesRead);
      return () => { socket.off("messages-read", onMessagesRead) };
  }, [chatId, userId]);

  const markRead = async () => {
    await axiosInstance.post(`/message/chat/read/${chatId}`);
  };

  return {
    showNewMsgBtn,
    setShowNewMsgBtn,
    isTyping,
    markRead,
  };
}
