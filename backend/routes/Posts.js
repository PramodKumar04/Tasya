const express = require("express");
const router = express.Router();
const {postModel} = require("../models/Posts"); // ✅ use the model

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await postModel.find().populate("author", "fullName");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to load posts" });
  }
});

// PATCH: Like/Unlike a post
router.patch("/:id/like", async (req, res) => {
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
