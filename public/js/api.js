// public/js/api.js
const API_URL = "/api/posts";

async function fetchPosts() {
  try {
    const response = await fetch(API_URL);
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function fetchPost(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const post = await response.json();
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function createPost(postData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error);
    }
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

async function updatePost(id, postData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error);
    }
    return result;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

async function deletePost(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error);
    }
    return result;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

