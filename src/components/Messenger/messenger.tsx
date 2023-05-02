import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Text, Title } from '@mantine/core';
import { io } from "socket.io-client";
import { useSocket } from "../../context/socket";

export default function Messenger() {
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState("");
  const [matchTraveler, setMatchedTraveler] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>();
  const [activeChat, setActiveChat] = useState(null);
  const socket = useSocket();
  const scrollRef: any = useRef();

  useEffect(() => {
    if (socket == null || currentChat == null) return;
    
    socket.emit("join conversation", { senderId: currentUser, receiverId: currentChat });

    socket.on("message history", (messages: any) => {
        setMessages(messages);
    });

    socket.on("receive message", (message: any) => {
        setMessages((messages: any) => [...messages, message]);
    });

    return () => {
        socket.off("message history");
        socket.off("receive message");
    };
  }, [socket, currentUser, currentChat]);

  const handleSubmit = async () => {
    socket.emit("send message", {
        senderId: currentUser, 
        receiverId: currentChat,
        message: newMessage
    });
    setNewMessage("")
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    async function fetch(){
      const currentUserPromise = await axios.get('http://localhost:8000/api/user/', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          idToken: localStorage.getItem('idToken') || '',
        },
      })
      const res = await axios.get('http://localhost:8000/api/matchTraveler/getUserMatches/',{
        params: {
          id: currentUserPromise.data.id
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          idToken: localStorage.getItem('idToken') || '',
        },
      })
      setMatchedTraveler(res.data?.user);
      setCurrentUser(currentUserPromise.data.id);
    }
    fetch();
  }, [])

  return (
    <>
      <div className="messenger">
        <div className="chatMenu" style={{backgroundColor: '#ebebeb'}}>
          <div className="chatMenuWrapper">
            <Title order={2}>Matched Travelers</Title>
            {matchTraveler?.map((c: any, index: any) => (
              <div key={index} onClick={() => {
                    setCurrentChat(c.recommendedTravelers[0]?.id),
                    setActiveChat(c.recommendedTravelers[0]?.id);
                }}>
                <div className={`conversation ${activeChat === c.recommendedTravelers[0]?.id ? "active" : ""}`}>
                    <span className={`conversationName ${activeChat === c.recommendedTravelers[0]?.id ? "active" : ""}`}>{c?.recommendedTravelers[0]?.firstName + ' ' + c?.recommendedTravelers[0]?.lastName || ''}<br/></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m: any, index: any) => (
                      <div key={index} className={null ? "message own" : "message"}>
                        <div className="messageTop">
                            <img
                            className="messageImg"
                            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            />
                            <p className="messageText">{m.message}</p>
                        </div>
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline" style={{backgroundColor: '#ebebeb'}}>
          <div className="chatOnlineWrapper">
          </div>
        </div>
      </div>
    </>
  );
}