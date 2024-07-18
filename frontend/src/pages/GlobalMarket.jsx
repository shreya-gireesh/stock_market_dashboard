import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const GlobalMarket = () => {
  const [globaldata, setData] = useState([]);

  const get_data =  async() =>{
    try{
      const response = await axios.get(' http://127.0.0.1:8000/global_market/');
      setData(response.data);
    } catch (error) {
      if (error.response) {
          console.error(`Error Status Code: ${error.response.status}`);
          console.error(error.response.data);
      } else {
          console.error('There was a problem with the axios request:', error.message);
      }
    }
    
  };

  useEffect(() => {
    get_data();
  }, []);

  const renderMarketData = (name, market) => (
    <Grid container spacing={2} key={name}>
      <Grid item xs={8}>
        <Typography variant="h6" sx={{ fontSize: '0.9rem' }}>
          {name}
          <span style={{ marginLeft: 8, color: market.change >= 0 ? 'green' : 'red' }}>
            {market.change >= 0 ? '⬆' : '⬇'}
          </span>
        </Typography>
        <Typography variant="h6" sx={{ fontSize: '0.9rem' }} style={{ color: market.change >= 0 ? 'green' : 'red' }}>
          {market.close_price.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item xs={3}>
      <Typography variant="body2" sx={{ color: 'grey'}}>
          {market.change >= 0 ? '+' : ''}{market.percent_change.toFixed(2)}%
        </Typography>
        <Typography variant="body2" sx={{ color: 'grey'}}>
          {market.change.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );

 // Split the data into two halves
 const dataEntries = Object.entries(globaldata);
 const midpoint = Math.ceil(dataEntries.length / 2);
 const firstHalf = dataEntries.slice(0, midpoint);
 const secondHalf = dataEntries.slice(midpoint);

 return (
   <Card>
     <CardContent>
       <Typography variant="h6">
        <LanguageIcon/>
        Global Market</Typography>
       <Divider style={{ margin: '16px 0' }} />
       <Grid container spacing={4}>
         <Grid item xs={6}>
           {firstHalf.map(([name, market]) => renderMarketData(name, market))}
         </Grid>
         <Grid item xs={6}>
           {secondHalf.map(([name, market]) => renderMarketData(name, market))}
         </Grid>
       </Grid>
     </CardContent>
   </Card>
 );
};


export default GlobalMarket;