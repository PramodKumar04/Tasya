import React from 'react';
import Hero from './Hero';
import Journey from './Journey';
import Blog from './Blog';
import OpenAccount from '../OpenAccount';
import NewsLetter from './NewsLetter';
import Connect from './Connect';
import Reviews from './Reviews';
import { useAuth } from '../signup/AuthContext';

function Opening() {
    const { user } = useAuth();
    return ( 
        <div>
            <Hero />
            <Journey />
            <Blog/>
            <NewsLetter/>
            {!user && <OpenAccount />}
            <Connect/>
            <Reviews/>
        </div>
     );
}

export default Opening;