const newComment = async (event) => {
  event.preventDefault();

  const btn = document.querySelector(".displayPostBtn");
  const post_id = btn.getAttribute('data-id');
  console.log(btn);
  console.log(post_id);

  document.location.assign('/posts/' + post_id)
};

document
.querySelector(".displayPostBtn")
.addEventListener("click", newComment);
