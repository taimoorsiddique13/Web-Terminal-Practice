const express = require("express");
const router = express.Router();
const BlogPost = require("../model/CollectionModel");
const path = require('path');

// Serve static files
router.use(express.static("public"));

// API Routes
// Get all posts
router.get("/api/posts", async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// Get single post
router.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error fetching post" });
  }
});

router.get("/edit", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/edit.html"));
});

// Create new post
router.post("/api/posts", async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const post = await BlogPost.create({
      title,
      content,
      published: published === "on" || published === true,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
});

// Update post
router.put("/api/posts/:id", async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        published: published === "on" || published === true,
      },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error updating post" });
  }
});

// Delete post
router.delete("/api/posts/:id", async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
});

// Serve HTML pages
router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

router.get("/add", (req, res) => {
  res.sendFile("form.html", { root: "./public" });
});

router.get("/edit/:id", (req, res) => {
  res.sendFile("edit.html", { root: "./public" });
});

module.exports = router;


