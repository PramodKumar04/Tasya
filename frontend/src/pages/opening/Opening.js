import React from 'react';
import Hero from './Hero';
import Journey from './Journey';
import Blog from './Blog';
import OpenAccount from '../OpenAccount';
import NewsLetter from './NewsLetter';
import Connect from './Connect';
import Reviews from './Reviews';

function Opening() {
    return ( 
        <div>
            <Hero />
            <Journey />
            <Blog/>
            <NewsLetter/>
            <OpenAccount />
            <Connect/>
            <Reviews/>
        </div>
     );
}

export default Opening;