import React, { useState } from 'react'
import { Paper, Text, Button } from '@mantine/core'
import { StyledLinks } from '../../container/Payment';
import { Box, ButtonGroup } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
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
          }}>Airline</Button>
        <Button variant={hotelToggle ? 'filled' : 'outline'} style={{marginRight: '10px'}} onClick={() => {
            setAirlinesToggle(false),
            setHotelToggle(true),
            setConvenienceToggle(false)
          }}>Hotel</Button>
        <Button variant={convenienceToggle ? 'filled' : 'outline'} style={{marginRight: '10px'}} onClick={() => {
            setAirlinesToggle(false),
            setHotelToggle(false),
            setConvenienceToggle(true)
          }}>Convenience</Button>
      </ButtonGroup>
    </Box>
    {airlineToggle && 
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {[{}, {}, {}, {}]?.map((mt: any, index: any) => (
            <Card key={index} style={{display: 'flex', flexDirection: 'row', marginBottom: '10px', width: '50%'}}>
            <CardMedia
              component="img"
              height="194"
              image="/image.png"
              alt="Paella dish"
            />
            <Box style={{display: 'flex', flexDirection: 'column'}}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                <span style={{color: '#228be6'}} >Airline </span>lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus blanditiis voluptatibus fuga recusandae quis provident delectus a est enim perspiciatis odit, excepturi quidem harum ipsa nesciunt nemo. Vero, porro explicabo.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <Box
                  sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  {value !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                  )}
                </Box>
              </CardActions>
              <Box>
              <Button variant={'outline'} style={{marginBottom: '10px', marginRight: '10px'}} onClick={() => {}}>Reserve</Button>
              <Button variant={'filled'} style={{marginBottom: '10px', marginRight: '10px'}} onClick={() => {}}>Show Prices</Button>
              </Box>
            </Box>
          </Card>
        ))}
      </div>
      }
      {hotelToggle &&
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {[{}, {}, {}, {}]?.map((mt: any, index: any) => (
              <Card key={index} style={{display: 'flex', flexDirection: 'row', marginBottom: '10px', width: '50%'}}>
              <CardMedia
                component="img"
                height="194"
                image="/image.png"
                alt="Paella dish"
              />
              <Box style={{display: 'flex', flexDirection: 'column'}}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                  <span style={{color: '#228be6'}} >Hotel </span>lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus blanditiis voluptatibus fuga recusandae quis provident delectus a est enim perspiciatis odit, excepturi quidem harum ipsa nesciunt nemo. Vero, porro explicabo.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <Box
                    sx={{
                      width: 200,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Rating
                      name="hover-feedback"
                      value={value}
                      precision={0.5}
                      getLabelText={getLabelText}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {value !== null && (
                      <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                  </Box>
                </CardActions>
                <Box>
                <Button variant={'outline'} style={{marginBottom: '10px', marginRight: '10px'}} onClick={() => {}}>Reserve</Button>
                <Button variant={'filled'} style={{marginBottom: '10px', marginRight: '10px'}} onClick={() => {}}>Show Prices</Button>
                </Box>
              </Box>
            </Card>
          ))}
        </div>
      }
      {convenienceToggle &&
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {[{}, {}, {}, {}]?.map((mt: any, index: any) => (
              <Card key={index} style={{display: 'flex', flexDirection: 'row', marginBottom: '10px', width: '50%'}}>
              <CardMedia
                component="img"
                height="194"
                image="/image.png"
                alt="Paella dish"
              />
              <Box style={{display: 'flex', flexDirection: 'column'}}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <span style={{color: '#228be6'}} >Convenience </span>lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus blanditiis voluptatibus fuga recusandae quis provident delectus a est enim perspiciatis odit, excepturi quidem harum ipsa nesciunt nemo. Vero, porro explicabo.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <Box
                    sx={{
                      width: 200,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Rating
                      name="hover-feedback"
                      value={value}
                      precision={0.5}
                      getLabelText={getLabelText}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {value !== null && (
                      <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                  </Box>
                </CardActions>
                <Box>
                <Button variant={'outline'} style={{marginBottom: '10px', marginRight: '10px'}} onClick={() => {}}>Reserve</Button>
                <Button variant={'filled'} style={{marginBottom: '10px', marginRight: '10px'}} onClick={() => {}}>Show Prices</Button>
                </Box>
              </Box>
            </Card>
          ))}
        </div>
      }
    </>
  )
}

export default Vendors;
