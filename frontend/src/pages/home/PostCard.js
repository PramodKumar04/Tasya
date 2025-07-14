import React, { useState } from 'react';
import {
  Card, CardHeader, CardMedia, CardContent, CardActions,
  Avatar, IconButton, Typography
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function PostCard({ post, currentUserId }) {
  const { _id, title, content, image, author, category, createdAt } = post;

  // Likes and liked state (local to this card)
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.likedBy?.includes(currentUserId));

  const handleClick = async () => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/posts/${_id}/like`, {
        userId: currentUserId,
      });
      setLikes(res.data.likes);
      setLiked(res.data.liked);
    } catch (err) {
      console.error("Error liking/unliking post", err);
    }
  };

  return (
    <Card
      sx={{ maxWidth: 345, textDecoration: 'none', color: 'inherit' }}
      className='post-card'
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            {author?.fullName?.[0].toUpperCase() || "U"}
          </Avatar>
        }
        action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
        title={title}
        subheader={`By ${author?.fullName?.toUpperCase() || "Unknown"} • ${new Date(createdAt).toLocaleDateString()}`}
      />
      {image?.url && (
        <CardMedia
          component="img"
          image={image.url}
          alt="Post image"
          sx={{ width: 345, height: 200, objectFit: 'cover', borderRadius: '4px' }}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.primary"
          sx={{
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleClick} aria-label="like">
          <FavoriteIcon sx={{ color: liked ? 'red' : 'gray' }} />
        </IconButton>
        <Typography sx={{ fontSize: "1rem", marginLeft: "4px", marginBottom: 0 }}>
          {likes}
        </Typography>
      </CardActions>
    </Card>
  );
}
