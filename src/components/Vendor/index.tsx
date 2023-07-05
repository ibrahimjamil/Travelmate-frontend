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

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


const Vendors = () => {
  const [airlineToggle ,setAirlinesToggle] = useState(true);
  const [hotelToggle ,setHotelToggle] = useState(false);
  const [convenienceToggle ,setConvenienceToggle] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);

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
        <Button variant={airlineToggle ? 'filled' : 'outline' } style={{marginRight: '10px'}} onClick={() => {
            setAirlinesToggle(true),
            setHotelToggle(false),
            setConvenienceToggle(false)
          }}>Hotels</Button>
        <Button variant={hotelToggle ? 'filled' : 'outline'} style={{marginRight: '10px'}} onClick={() => {
            setAirlinesToggle(false),
            setHotelToggle(true),
            setConvenienceToggle(false)
          }}>Specific Hotel</Button>
      </ButtonGroup>
    </Box>
    {airlineToggle && 
       <List/>
      }
      {hotelToggle &&
        <Hotel/>
      }
    </>
  )
}

export default Vendors;
