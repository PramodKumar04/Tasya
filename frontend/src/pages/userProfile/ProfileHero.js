import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../signup/AuthContext';
import Posting from '../home/Posting.js';
import AddButton from '../home/AddButton.js';
import ProfilePage from './ProfilePage.js';

export default function ProfileHero() {
    const { username: paramUsername } = useParams();
    const { user: currentUser } = useAuth();
    const [userPosts, setUserPosts] = useState([]);

    const effectiveUsername = paramUsername || (currentUser && currentUser.username);

    useEffect(() => {
        if (effectiveUsername) {
            fetchUserPosts();
        }
    }, [effectiveUsername]);

    const fetchUserPosts = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/posts/user/${effectiveUsername}`);
            setUserPosts(res.data);
        } catch (error) {
            console.error("Failed to fetch user posts:", error);
        }
    };

    return (
        <div>
            <div className="container mt-4">
                <div className="row">
                    <div className=" col col-lg-12 col-md-10 col-sm-8 mt-4">
                        <ProfilePage/>
                    </div>
                    <div className="col-12 px-md-5">
                        <Posting posts={userPosts} />
                    </div>
                </div>
                <AddButton/>
                <br/><br/>
            </div>
        </div>
    );
}
