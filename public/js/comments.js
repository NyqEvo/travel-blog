const newComment = async (event) => {
  event.preventDefault();

  const btn = document.querySelector("#createCommentBtn");
  if (btn.hasAttribute("data-id")) {
    const post_id = btn.getAttribute("data-id");
    document.location.replace("/comment/" + post_id + "/new");
  } else {
    alert("Create Comment button missing Post ID");
  }
};

let btn = document.querySelector("#createCommentBtn");
if (btn) {
  btn.addEventListener("click", newComment);
}
