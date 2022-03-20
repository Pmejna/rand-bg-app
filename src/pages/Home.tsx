import { Typography } from '@mui/material';
import React, { useState } from 'react';
import CanvasSketch from '../components/Canvas';


const Home: React.FC = (): JSX.Element => {

  return(
      <div>
        <Typography>Home</Typography>
        <CanvasSketch dimensions={[800, 240]} colors={['#231145', '#24cd22', '#ddeecc', '#a3d1cb']} background='#000000'/>
      </div>
    )
}

export default Home;
