import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from 'simple-peer';

export const SocketContext = createContext<any>(null);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }: any) {
  const [socket, setSocket] = useState<any>();
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
    const newSocket = io("https://travelmate-backend.onrender.com", { autoConnect: false });
    setSocket(newSocket);
    newSocket.connect();
    socket?.connect()
  }, []);

  useEffect(() => {
    const setupMediaAndSocket = async () => {
      try {
        // for stream of laptop camera
        const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(currentStream);

        // setting video ref to stream of our laptop
        myVideo.current.srcObject = currentStream;
      
        // setting socket id to current user
        socket?.on('me', (id: any) => setMe(id));

        // will listen from backend event 
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
  }, [socket]);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    // will attach with user that is calling as recieving user clicks for answer call
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id: any) => {   // takes other user socket id

    // initiate webRTC connection for connecting two peers
    const peer = new Peer({ initiator: true, trickle: false, stream });

    // it will call that signal when local peer is ready to send signal
    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });  // pass callUser to backend will other user id, our signal data, name and from
    });

    // next two will be called on call accepted when both remote peers connected
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket?.on('callAccepted', (signal: any) => {
      setCallAccepted(true);

      // will attach with remote if call accepted by remote user
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