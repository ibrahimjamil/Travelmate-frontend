import { Paper, Text, Button } from '@mantine/core'
import React from 'react'
import { StyledLinks } from '../../container/Payment';

const Vendors = () => {

  return (
    <>
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {[{}, {}, {}, {}]?.map((mt: any, index: any) => (
            <Paper key={index} withBorder shadow="lg" p="md" style={{width: '50%', marginBottom: '20px', marginTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{textAlign: 'center', marginBottom: '20px'}}>Vendor Api Item</Text>
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
                  window.location.href = 'http://localhost:3000/app/admin/payments'
                }}
                >
                 {'checkout'}
              </StyledLinks>
            </Paper>
        ))}
      </div>
    </>
  )
}

export default Vendors;
