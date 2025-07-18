const express = require("express");
const router = express.Router();
const { postModel } = require("../models/Posts.js");
const { cloudinary, upload } = require("../cloudConfig.js");

// GET all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find().populate("author", "fullName");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to load posts" });
  }
});

// POST a post with image and video upload
router.post("/posts", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 }
]), async (req, res) => {
  const { title, content, category } = req.body;

  try {
    console.log("REQ BODY:", req.body);
    console.log("FILES:", req.files);

    const newPost = new postModel({
      author: "68735376fb9864bffdb5f899",
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
    const post = await postModel.findById(id).populate("author", "fullName");
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: "Could not fetch post" });
  }
});

// PATCH: Like/Unlike a post
router.patch("/post/:id/like", async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId; // Simulated for now

  try {
    const post = await postModel.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const alreadyLiked = post.likedBy.includes(userId);

    if (alreadyLiked) {
      post.likes -= 1;
      post.likedBy.pull(userId);
    } else {
      post.likes += 1;
      post.likedBy.push(userId);
    }

    await post.save();
    res.json({ likes: post.likes, liked: !alreadyLiked });
  } catch (err) {
    console.error("Error liking/unliking post:", err);
    res.status(500).json({ error: "Could not process like" });
  }
});

module.exports = router;