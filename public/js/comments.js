const newComment = async (event) => {
  event.preventDefault();

  const btn = document.querySelector("#createCommentBtn");
  const info = document.querySelector("#info").value.trim();
  const tag = document.querySelector("#tag").value.trim();
  const post_id = btn.getAttribute('data-id');


  const response = await fetch(`/api/comment`, {
    method: 'POST',
    body: JSON.stringify({ info, tag, post_id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.reload()
  } else {
    alert("Create Comment has failed");
  }
};

document
  .querySelector("#createCommentBtn")
  .addEventListener("click", newComment);
