import axios from 'axios';
import { Loader, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import MatchedTravelers from '../../components/MatchedTravelers';
import AppConfig from '../../constants/AppConfig';

const MatchedTraveler = () => {
  const [matchTraveler, setMatchedTraveler] = useState<any>();
  useEffect(() => {
    async function fetch(){
      const currentUserPromise = await axios.get(`${AppConfig.APP_URL}user/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          idToken: localStorage.getItem('idToken') || '',
        },
      })
      const res = await axios.get(`${AppConfig.APP_URL}matchTraveler/getUserMatches/`,{
        params: {
          id: currentUserPromise.data.id
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          idToken: localStorage.getItem('idToken') || '',
        },
      })
      setMatchedTraveler(res.data?.user);
    }
    fetch();
  }, [])
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{textAlign: 'center', fontWeight: 700, marginBottom: '20px'}}>Matched Travelers</Text>
        {matchTraveler?.length ? <MatchedTravelers MT={matchTraveler}/> : <Loader/>}
    </div>
  )
}

export default MatchedTraveler;
