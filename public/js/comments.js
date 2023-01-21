const newComment = async (event) => {
  event.preventDefault();

  const btn = document.querySelector("#createCommentBtn");
  const info = document.querySelector("#location").value.trim();
  const tag = document.querySelector("#description").value.trim();
  const post_id = btn.getAttribute('data-id');

  if (btn.hasAttribute("#createCommentBtn")) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ info, tag, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(response.ok) {
      document.location.reload()
    } else {
      alert("Create Comment has failed");
    }
  } else {
    alert('Button cannot be found')
  }
};



document
.querySelector("#createCommentBtn")
.addEventListener("click", newComment);
