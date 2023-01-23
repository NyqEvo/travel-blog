const newPost = async (event) => {
  event.preventDefault();

  // const btn = document.querySelector("#createPostBtn");
  const location = document.querySelector("#location").value.trim();
  const description = document.querySelector("#description").value.trim();
  // const post_id = btn.getAttribute("data-id");
  // console.log("post_id:", post_id);
  const response = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify({ location, description }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/displayposts')
  } else {
    alert('Creation of post failed')
  }
};

document
  .querySelector("#createPostBtn")
  .addEventListener("click", newPost);

