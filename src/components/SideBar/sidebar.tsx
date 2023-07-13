import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { SocketContext } from '../../context/socket';

const ContainerStyled = styled(Container)(({ theme }) => ({
  width: '600px',
  margin: '35px 0',
  padding: 0,
  [theme.breakpoints.down('xs')]: {
    width: '80%',
  },
}));

const PaperStyled = styled(Paper)({
  padding: '10px 20px',
  border: '2px solid black',
});

const FormRoot = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const GridContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
  },
}));

const PaddingGridItem = styled(Grid)({
  padding: 20,
});

const SidebarComponent = ({ children }: any) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <ContainerStyled>
      <PaperStyled elevation={10}>
        <FormRoot noValidate autoComplete="off">
          <GridContainer>
            <PaddingGridItem item xs={12} md={6}>
              <Typography gutterBottom variant="h6">Account Info</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me}>
                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </PaddingGridItem>
            <PaddingGridItem item xs={12} md={6}>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} sx={{ marginTop: 20 }}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} sx={{ marginTop: 20 }}>
                  Call
                </Button>
              )}
            </PaddingGridItem>
          </GridContainer>
        </FormRoot>
        {children}
      </PaperStyled>
    </ContainerStyled>
  );
};

export default SidebarComponent;
