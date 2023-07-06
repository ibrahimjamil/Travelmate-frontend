import { Paper, Text, Button } from '@mantine/core'
import React from 'react'
import { StyledLinks } from '../../container/Payment';

const MatchedTravelers = (props: any) => {
    const {MT} = props;

  return (
    <>
        {MT?.map((mt: any, index: any) => (
            <Paper key={index} withBorder shadow="lg" p="md" style={{width: '50%', marginBottom: '20px', marginTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{textAlign: 'center', marginBottom: '20px'}}>
                  {'Name:  ' +mt?.recommendedTravelers[0]?.firstName + ' ' + mt?.recommendedTravelers[0]?.lastName || ''}<br/>
                  {'Age:  ' + mt?.recommendedTravelers[0]?.age || ''}<br/>
                  {'Email:  ' + mt?.recommendedTravelers[0]?.email || ''}<br/>
                  {'Gender:  ' + mt?.recommendedTravelers[0]?.gender || ''}<br/>
                  {'Location:  ' + mt?.recommendedTravelers[0]?.location || ''}<br/>
              </Text>
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
                style={{width: '30%'}} 
                onClick={() => {
                  window.location.href = 'https://travelmate-frontend.vercel.app/app/admin/chats'
                }}
                >
                 {'Chat Now'}
              </StyledLinks>
            </Paper>
        ))}
    </>
  )
}

export default MatchedTravelers
