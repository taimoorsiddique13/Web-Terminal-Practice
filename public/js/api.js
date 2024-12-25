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

// Add this to your HTML files
async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const postData = {
    title: formData.get("title"),
    content: formData.get("content"),
    published: formData.get("published") === "on",
  };

  try {
    await createPost(postData);
    window.location.href = "/";
  } catch (error) {
    alert("Error creating post: " + error.message);
  }
}

async function handleUpdate(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const postId = new URLSearchParams(window.location.search).get("id");
  const postData = {
    title: formData.get("title"),
    content: formData.get("content"),
    published: formData.get("published") === "on",
  };

  try {
    await updatePost(postId, postData);
    window.location.href = "/";
  } catch (error) {
    alert("Error updating post: " + error.message);
  }
}

async function handleDelete(id) {
  if (confirm("Are you sure you want to delete this post?")) {
    try {
      await deletePost(id);
      location.reload();
    } catch (error) {
      alert("Error deleting post: " + error.message);
    }
  }
}
