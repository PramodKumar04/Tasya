import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../signup/AuthContext';
import Posting from '../home/Posting.js';
import AddButton from '../home/AddButton.js';
import ProfilePage from './ProfilePage.js';
import api from '../../api';

export default function ProfileHero() {
    const { username: paramUsername } = useParams();
    const { user: currentUser } = useAuth();
    const [userPosts, setUserPosts] = useState([]);

    const effectiveUsername = paramUsername || (currentUser && currentUser.username);

    const fetchUserPosts = useCallback(async () => {
        try {
            const res = await api.get(`/posts/user/${effectiveUsername}`);
            setUserPosts(res.data);
        } catch (error) {
            console.error("Failed to fetch user posts:", error);
        }
    }, [effectiveUsername]);

    useEffect(() => {
        if (effectiveUsername) {
            fetchUserPosts();
        }
    }, [effectiveUsername, fetchUserPosts]);

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
