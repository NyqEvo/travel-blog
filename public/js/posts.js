const router = require("../../controllers/homeRoutes");

const newPost = async (event) => {
  event.preventDefault();

  const btn = document.querySelector("#createPostBtn");
  if (btn.hasAttribute("data-id")) {
    const post_id = btn.getAttribute("data-id");
    console.log("post_id:", post_id);
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ location, description }),
      headers: { 'Content-Type': 'application/json' },});
  } else {
    alert("Create Comment button missing Post ID");
  }
};



let btn = document.querySelector("#createCommentBtn");
if (btn) {
  btn.addEventListener("click", newComment);
}
