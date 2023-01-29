const newComment = async (event) => {
  event.preventDefault();

  const btn = document.querySelector("#createCommentBtn");
  const info = document.querySelector("#info").value.trim();
  const tag_id = document
    .querySelector("#currentTag")
    .getAttribute("data")
    .trim();
  const post_id = btn.getAttribute("data-id");

  const response = await fetch(`/api/comment`, {
    method: "POST",
    body: JSON.stringify({ info, tag_id, post_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Create Comment has failed");
  }
};

let buttons = document.querySelectorAll(".dropdown-item");

for (let button of buttons) {
  button.addEventListener("click", function () {
    let t = document.querySelector("#currentTag");
    t.innerHTML = this.innerHTML;
    t.setAttribute("data", this.id);
  });
}

document
  .querySelector("#createCommentBtn")
  .addEventListener("click", newComment);
