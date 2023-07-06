import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext<any>(null);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }: any) {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const newSocket = io("https://travelmate-backend.onrender.com", { autoConnect: false });
    setSocket(newSocket);

    newSocket.connect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}