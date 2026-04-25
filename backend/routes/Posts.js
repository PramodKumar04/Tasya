const express = require("express");
const router = express.Router();
const { postModel } = require("../models/Posts.js");
const { userModel } = require("../models/User.js");
const { cloudinary, upload } = require("../cloudConfig.js");

// GET all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find().populate("author", "username fullName profileImage");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to load posts" });
  }
});

// GET posts by username
router.get("/posts/user/:username", async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await postModel.find({ author: user._id })
                                 .populate("author", "username fullName")
                                 .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Failed to load user posts" });
  }
});

// POST a post with image and video upload
router.post("/posts", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 }
]), async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "You must be logged in to create a post." });
  }

  const { title, content, category } = req.body;

  try {
    console.log("REQ BODY:", req.body);
    console.log("FILES:", req.files);

    const newPost = new postModel({
      author: req.user._id,
      title,
      content,
      category,
    });

    // Handle image upload to Cloudinary
    if (req.files?.image?.[0]) {
      try {
        const imageResult = await cloudinary.uploader.upload_stream(
          {
            folder: "tasya_dev/images",
            resource_type: "image"
          },
          (error, result) => {
            if (error) {
              console.error("Image upload error:", error);
              throw error;
            }
            return result;
          }
        );
        
        // Convert buffer to base64 and upload
        const imageBuffer = req.files.image[0].buffer;
        const imageBase64 = `data:${req.files.image[0].mimetype};base64,${imageBuffer.toString('base64')}`;
        
        const imageUploadResult = await cloudinary.uploader.upload(imageBase64, {
          folder: "tasya_dev/images",
          resource_type: "image"
        });

        newPost.image = {
          url: imageUploadResult.secure_url,
          filename: imageUploadResult.public_id
        };
      } catch (imageError) {
        console.error("Image upload failed:", imageError);
      }
    }

    // Handle video upload to Cloudinary
    if (req.files?.video?.[0]) {
      try {
        const videoBuffer = req.files.video[0].buffer;
        const videoBase64 = `data:${req.files.video[0].mimetype};base64,${videoBuffer.toString('base64')}`;
        
        const videoUploadResult = await cloudinary.uploader.upload(videoBase64, {
          folder: "tasya_dev/videos",
          resource_type: "video"
        });

        newPost.video = {
          url: videoUploadResult.secure_url,
          filename: videoUploadResult.public_id
        };
      } catch (videoError) {
        console.error("Video upload failed:", videoError);
      }
    }

    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });

  } catch (error) {
    console.error("💥 Error Creating a Post:", error);
    res.status(500).json({ message: "Failed to Add post", error: error.message });
  }
});

router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id).populate("author", "username fullName profileImage");
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: "Could not fetch post" });
  }
});

// PATCH: Like/Unlike a post
router.patch("/post/:id/like", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "You must be logged in to like posts." });
  }
  const { id } = req.params;

  try {
    const post = await postModel.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const alreadyLiked = post.likedBy.includes(req.user._id);

    if (alreadyLiked) {
      post.likes = Math.max(0, (post.likes || 1) - 1);
      post.likedBy.pull(req.user._id);
    } else {
      post.likes = (post.likes || 0) + 1;
      post.likedBy.push(req.user._id);
    }

    await post.save();
    res.json({ likes: post.likes, liked: !alreadyLiked });
  } catch (err) {
    console.error("Error liking/unliking post:", err);
    res.status(500).json({ error: "Could not process like" });
  }
});

router.get("/posts/search",async(req,res)=>{
  try{
    const {q} =req.query;
    if(!q || q.trim()===""){
      return res.status(400).json({message:"Search query is required"});
    }

    const results = await postModel.find(
      {$text:{$search:q}},
      {score:{$meta:"textScore"}}
    )
    .sort({ score: { $meta: "textScore" } })
    .populate("author", "username");

    res.status(200).json(results);
  }catch(error){
    res.status(500).json({message:"Search failed"});
  }
});

const { commentModel } = require("../models/Comments.js");

// POST a comment on a post
router.post("/post/:id/comment", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "You must be logged in to comment." });
  }

  const { id } = req.params;
  const { content } = req.body;

  try {
    const newComment = new commentModel({
      post: id,
      author: req.user._id,
      content
    });

    await newComment.save();
    
    // Populate author before returning
    await newComment.populate("author", "username fullName");
    
    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment", error: error.message });
  }
});

// GET comments for a post
router.get("/post/:id/comments", async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await commentModel.find({ post: id })
      .populate("author", "username fullName")
      .sort({ createdAt: -1 }); // Newest first
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Could not fetch comments" });
  }
});

// DELETE a comment
router.delete("/comment/:commentId", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const comment = await commentModel.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Check if the user is the author
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }

    await commentModel.findByIdAndDelete(req.params.commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
});

// PATCH: Like/Unlike a comment
router.patch("/comment/:commentId/like", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "You must be logged in to like comments." });
  }

  try {
    const comment = await commentModel.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const currentUserId = req.user._id;
    const alreadyLiked = comment.likedBy.includes(currentUserId);

    if (alreadyLiked) {
      comment.likes = Math.max(0, (comment.likes || 1) - 1);
      comment.likedBy.pull(currentUserId);
    } else {
      comment.likes = (comment.likes || 0) + 1;
      comment.likedBy.push(currentUserId);
    }

    await comment.save();
    res.json({ likes: comment.likes, liked: !alreadyLiked });
  } catch (err) {
    console.error("Error liking comment:", err);
    res.status(500).json({ message: "Error liking comment" });
  }
});

module.exports = router;