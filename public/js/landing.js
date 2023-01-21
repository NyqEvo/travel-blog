const goToPost = async (event) => {
    event.preventDefault();
  
    const btn = document.querySelector(".displayPost");
    if (btn.hasAttribute("data-id")) {
      const post_id = btn.getAttribute("data-id");
      document.location.replace("/post/" + post_id);
    } else {
      alert("Post Id not found");
    }
  };
  
  
  
  let btn = document.querySelector(".displayPost");
  if (btn) {
    btn.addEventListener("click", goToPost);
  }