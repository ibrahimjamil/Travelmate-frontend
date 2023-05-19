import {
  Grid,
  InputLabel,
  TextField,
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import AppConfig from '../../constants/AppConfig';
interface StyledLinksProps {
  actionButton?: boolean;
  cancelButton?: boolean;
}

export const StyledLinks = styled(Button)<StyledLinksProps>(
  ({ actionButton, cancelButton }: any) => ({
    padding: '10px 30px',
    fontWeight: 700,
    borderRadius: '5px',
    textTransform: 'none',
    ...(!!actionButton && {
      color: 'black',
      background: '#1C7ED6',
      borderColor: '#1C7ED6',
    }),
    ...(!!cancelButton && {
      color: '#1C7ED6',
      background: 'white',
      border: '1px solid #1C7ED6',
      marginRight: '16px',
    }),
  })
);

interface ShippingDataType {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
}

const Payment = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cvvNumber, setCvvNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expireMonth, setExpireMonth] = useState('');
  const [expireYear, setExpireYear] = useState('');
  const [success, setSuccess] = useState(false);

  const submitHandler = () => {
    if (
      _.isEmpty(firstName) ||
      _.isEmpty(lastName) ||
      _.isEmpty(cvvNumber) ||
      _.isEmpty(cardNumber) ||
      _.isEmpty(expireMonth) ||
      _.isEmpty(expireYear)
    ) {
      // eslint-disable-next-line no-undef
      alert('Please Fill Empty Fields');
      return;
    }
    // paymentInformation({
    //   firstName,
    //   lastName,
    //   cvvNumber,
    //   cardNumber,
    //   expireMonth,
    //   expireYear,
    // });
  };

  const handlePayment = async () => {
    const data = await axios.post(process.env.APP_URL + 'payment/create-checkout-session')
    if (data.data) {
      const error = data.data.error;
      if (!error){
        setSuccess(true)

        setTimeout(() => {
          setSuccess(false);
        }, 5000)
      }
    }
  }

  return (
    <Grid
      container
      sx={{
        background: 'white',
        marginY: 5,
        borderRadius: 2,
      }}
    >
      <Grid item xs={12} lg={6} sx={{ margin: { xs: 2, sm: 4, lg: 5, xl: 5 } }}>
        <Typography variant="h5" gutterBottom>
          Payment Information
        </Typography>

        <Box
          sx={{ display: { lg: 'flex', md: 'flex', xs: 'block' } }}
          justifyContent="space-between"
          columnGap={4}
        >
          <Grid item xs={12} lg={6}>
            <InputLabel htmlFor="first-name" sx={{ fontSize: 14, mb: 1 }}>
              First Name
            </InputLabel>
            <TextField
              sx={{ width: '100%', borderColor: '#e0e0e0', mb: 3 }}
              size="small"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <InputLabel htmlFor="last-name" sx={{ fontSize: 14, mb: 1 }}>
              Last Name
            </InputLabel>
            <TextField
              sx={{ width: '100%', borderColor: '#e0e0e0', mb: 3 }}
              size="small"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
        </Box>
        <Box
          sx={{ display: { lg: 'flex', md: 'flex', xs: 'block' } }}
          justifyContent="space-between"
          columnGap={4}
        >
          <Grid item xs={12} lg={6}>
            <InputLabel htmlFor="dob" sx={{ fontSize: 14, mb: 1 }}>
              Card Number
            </InputLabel>
            <TextField
              sx={{ width: '100%', borderColor: '#e0e0e0', mb: 3 }}
              size="small"
              placeholder="*****************"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <InputLabel htmlFor="phone-number" sx={{ fontSize: 14, mb: 1 }}>
              CVV Number
            </InputLabel>
            <TextField
              sx={{ width: '100%', borderColor: '#e0e0e0', mb: 3 }}
              size="small"
              placeholder="Enter  CVV Number"
              value={cvvNumber}
              onChange={(e) => setCvvNumber(e.target.value)}
            />
          </Grid>
        </Box>

        <Box
          sx={{ display: { lg: 'flex', md: 'flex', xs: 'block' } }}
          justifyContent="space-between"
          columnGap={4}
        >
          <Grid item xs={12} lg={6}>
            <InputLabel htmlFor="expireMonth" sx={{ fontSize: 14, mb: 1 }}>
              Expire Month
            </InputLabel>
            <TextField
              sx={{ width: '100%', borderColor: '#e0e0e0', mb: 3 }}
              size="small"
              placeholder="Enter Expire Month"
              value={expireMonth}
              onChange={(e) => setExpireMonth(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <InputLabel htmlFor="expireYear" sx={{ fontSize: 14, mb: 1 }}>
              Expire Year
            </InputLabel>
            <TextField
              sx={{ width: '100%', borderColor: '#e0e0e0', mb: 3 }}
              size="small"
              placeholder="Enter Expire Year"
              value={expireYear}
              onChange={(e) => setExpireYear(e.target.value)}
            />
          </Grid>
        </Box>
        {success && <Alert sx={{ marginBottom: '10px' }} severity="success">Payment has been successful!</Alert>}
        <Box>
          <StyledLinks
            cancelButton
            sx={{
              width: {
                xs: '100%',
                sm: 'fit-content',
                md: 'fit-content',
                lg: 'fit-content',
              },
              marginBottom: { xs: 2, sm: 0 },
            }}
            onClick={submitHandler}
          >
            {'Continue'}
          </StyledLinks>
          <StyledLinks
            variant="outlined"
            actionButton
            sx={{
              width: {
                xs: '100%',
                sm: 'fit-content',
                md: 'fit-content',
                lg: 'fit-content',
              },
            }}
            onClick={() => handlePayment()}
          >
            Pay Now
          </StyledLinks>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Payment;
