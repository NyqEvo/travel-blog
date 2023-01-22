const goToPost = async (event) => {
  event.preventDefault();
  const btn = document.querySelector(".displayPost");
  const post_id = btn.getAttribute("data-id");
  document.location.replace("/post/" + post_id);
};



document
.querySelector(".displayPost")
.addEventListener("click", goToPost);
