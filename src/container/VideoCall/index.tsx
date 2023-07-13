import React from 'react';
import { Typography, AppBar, styled } from '@mui/material';
import VideoPlayerComponent from '../../components/VideoPlayerComponent/videoPlayer';
import SidebarComponent from '../../components/SideBar/sidebar';
import NotificationComponent from '../../components/Notification/notification';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  borderRadius: 15,
  margin: '30px 100px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '600px',
  border: '2px solid black',

  [theme.breakpoints.down('xs')]: {
    width: '90%',
  },
}));

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const VideoCall = () => {
  return (
    <Wrapper>
      <AppBarStyled position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBarStyled>
      <VideoPlayerComponent />
      <SidebarComponent>
        <NotificationComponent />
      </SidebarComponent>
    </Wrapper>
  );
};

export default VideoCall;