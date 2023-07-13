import React, { useContext } from 'react'
import { SocketContext } from '../../context/socket';
import { Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';


const Video = styled('video')({
  width: '550px',
  '@media (max-width:600px)': {
    width: '300px',
  },
});

const GridContainer = styled(Grid)({
  justifyContent: 'center',
  '@media (max-width:600px)': {
    flexDirection: 'column',
  },
});

const PaperContainer = styled(Paper)({
  padding: '10px',
  border: '2px solid black',
  margin: '10px',
});

const VideoPlayerComponent = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  return (
    <GridContainer container>
      {stream && (
        <PaperContainer>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <Video playsInline muted ref={myVideo} autoPlay />
          </Grid>
        </PaperContainer>
      )}
      {callAccepted && !callEnded && (
        <PaperContainer>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <Video playsInline ref={userVideo} autoPlay />
          </Grid>
        </PaperContainer>
      )}
    </GridContainer>
  );
};
export default VideoPlayerComponent;
