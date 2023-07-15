import React, { useState } from 'react'
import { Button } from '@mantine/core'
import { Box, ButtonGroup } from '@mui/material';
import { IconButtonProps } from '@mui/material/IconButton';
import Hotel from '../../custompages/hotel/Hotel';
import List from '../../custompages/list/List';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};



const Vendors = () => {
  const [hotelListToggle ,setHotelListToggle] = useState(true);
  const [hotelToggle ,setHotelToggle] = useState(false);
  const [convenienceToggle ,setConvenienceToggle] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [specificHotel, setSpecificHotel] = useState(0);
  const [list, setList] = useState([
    {
      title: 'PC Hotel',
      image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/278504590.jpg?k=2d6676b5981e1fafc018b5d092375e37656a136a18b08e07acebf39a6b395ae1&o=&hp=1",
      distance: '500m from center',
      taxiDip: 'Free airport taxi',
      subTitle: 'Studio Apartment with Air conditioning',
      features: 'Entire studio • 1 bathroom • 21m² 1 full bed',
      cancelOption: 'You can cancel later, so lock in this great price today!',
      ratingTitle: 'Excellent',
      rating: '8.9',
      price: 112,
      taxes: 'Includes taxes and fees',
      checkAvailability: 'See availability',
      adult: 2,
      children: 3,
      room: 4
    },
    {
      title: 'Avari Hotel',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/277887727.jpg?k=218aa708109b7bff6274e168bbfe07726ae0b5922ed37280e2b5b1c1e86a892b&o=&hp=1',
      distance: '500m from center',
      taxiDip: 'Free airport taxi',
      subTitle: 'Studio Apartment with Air conditioning',
      features: 'Entire studio • 1 bathroom • 21m² 1 full bed',
      cancelOption: 'You can cancel later, so lock in this great price today!',
      ratingTitle: 'Excellent',
      rating: '9',
      price: 200,
      taxes: 'Includes taxes and fees',
      checkAvailability: 'See availability',
      adult: 5,
      children: 10,
      room: 5
    }
  ]) 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="text button group">
        <Button variant={hotelListToggle ? 'filled' : 'outline' } style={{marginRight: '10px'}} onClick={() => {
            setHotelListToggle(true),
            setHotelToggle(false),
            setConvenienceToggle(false)
          }}>Hotels</Button>
        <Button variant={hotelToggle ? 'filled' : 'outline'} style={{marginRight: '10px'}} onClick={() => {
            setHotelListToggle(false),
            setHotelToggle(true),
            setConvenienceToggle(false)
          }}>Specific Hotel</Button>
      </ButtonGroup>
    </Box>
    {hotelListToggle && 
       <List lists={list} setSpecificHotel={setSpecificHotel}/>
      }
      {hotelToggle &&
        <Hotel lists={list} specificHotel={specificHotel}/>
      }
    </>
  )
}

export default Vendors;
