import React, { useContext } from 'react';
import { Button } from '@mui/material';

import { SocketContext, useSocket } from '../../context/socket';

const NotificationComponent = () => {
  const { answerCall, call, callAccepted } = useSocket();

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default NotificationComponent;
