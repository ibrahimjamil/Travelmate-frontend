import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from 'simple-peer';

export const SocketContext = createContext<any>(null);

export function useSocket() {
  return useContext(SocketContext);
}

const socket = io("https://travelmate-backend.onrender.com", { autoConnect: false });

export function SocketProvider({ children }: any) {
  const [callAccepted, setCallAccepted] = useState<any>(false);
  const [callEnded, setCallEnded] = useState<any>(false);
  const [stream, setStream] = useState<any>();
  const [name, setName] = useState<any>('');
  const [call, setCall] = useState<any>({});
  const [me, setMe] = useState<any>('');

  const myVideo: any = useRef();
  const userVideo: any = useRef();
  const connectionRef: any = useRef();

  useEffect(() => {
    const setupMediaAndSocket = async () => {
      try {
        const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      
        socket?.on('me', (id: any) => setMe(id));
        socket?.on('callUser', ({ from, name: callerName, signal }: any) => {
          setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
      } catch (error) {
        // Handle error
      }
    };
  
    if (socket) {
      setupMediaAndSocket();
    }
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id: any) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    socket?.on('callAccepted', (signal: any) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      socket,
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall
    }}
    >
      {children}
    </SocketContext.Provider>
  );
}