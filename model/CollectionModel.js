const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  published: { type: Boolean, default: false },
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);


