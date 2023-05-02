import { Paper, Text, Button } from '@mantine/core'
import React from 'react'

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
              <Button 
                onClick={() => {
                  window.location.href = 'http://localhost:3000/app/admin/chats'
                }} 
                style={{width: '30%'}} 
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}>Chat Now</Button>
            </Paper>
        ))}
    </>
  )
}

export default MatchedTravelers
