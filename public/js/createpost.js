const router = require("../../controllers/homeRoutes");

const newPost = async (event) => {
  event.preventDefault();

  const btn = document.querySelector("#createPostBtn");
  const location = document.querySelector("#location").value.trim();
  const description = document.querySelector("#description").value.trim();
  if (btn.hasAttribute("data-id")) {
    const post_id = btn.getAttribute("data-id");
    console.log("post_id:", post_id);
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ location, description }),
      headers: { 'Content-Type': 'application/json' },});
      if (response.ok) {
        document.location.replace('/posts/' + post_id)
      } else {
        alert('Creation of post failed')
      }
  } else {
    alert("Create Comment button missing Post ID");
  }
};



document
.querySelector("#createPostBtn")
.addEventListener("click", newPost);

