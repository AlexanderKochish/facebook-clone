import Chat from "../../components/Messages/Chat";
import MessagesContactList from "../../components/Messages/MessagesContactList";
import { useContext, useEffect, useState } from "react";
import { MessagesContext } from "../../context/MessagesContext";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import ChatUserProfile from "../../components/Messages/ChatUserProfile";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { state } = useContext(MessagesContext);
  const { chatId } = state;

  useEffect(() => {
    const getChatMessages = () => {
      const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unsub();
      };
    };

    getChatMessages();

    return () => {
      getChatMessages();
    };
  }, [chatId]);

  return (
    <div className="flex items-center w-full">
      <MessagesContactList />
      <Chat messages={messages} />
      <ChatUserProfile />
    </div>
  );
};

export default ChatPage;
