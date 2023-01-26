const newComment = async (event) => {
  event.preventDefault();
console.log(event.target)
 
  const post_id = event.target.getAttribute('data-id');
  console.log(post_id);

  document.location.assign('/posts/' + post_id)
};

let buttons = document
.querySelectorAll(".displayPostBtn"); //we get all the elements
//we need to loop thru all the elements and add an event listener

for (let button of buttons) {
  button.addEventListener("click", newComment);
}

