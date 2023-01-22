const newComment = async (event) => {
  event.preventDefault();

  const btn = document.querySelectorAll(".displayPostBtn");
  const post_id = btn.getAttribute('data-id');

  if (btn.hasAttribute(".displayPostBtn")) {
      document.location.replace('/posts/' + post_id)
    } else {
      alert("Post cannot be found or Post button is missing post id");
    }
  };



document
.querySelector("#createCommentBtn")
.addEventListener("click", newComment);
