const express = require("express");
const router = express.Router();
const { postModel } = require("../models/Posts.js");

const { upload } = require("../cloudConfig.js");
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
//post a post
router.post("/posts",upload.single("image") , async (req, res) => {
  const { title, content, category } = req.body;

  try {
    console.log("REQ BODY: ", req.body);
    console.log("REQ FILE: ", req.file);

    const newPost = new postModel({
      author: "68735376fb9864bffdb5f899",
      title,
      content,
      category,
      image: {
        url: req.file.path,
        filename: req.file.filename,
      },
    });

    await newPost.save();

    console.log("NEW POST SAVED:", newPost);
    res.status(201).json({ message: "Post created", post: newPost });

  } catch (error) {
    console.error("💥 Error Creating a Post:", error);
    res
      .status(500)
      .json({ message: "Failed to Add post", error: error.message });
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
