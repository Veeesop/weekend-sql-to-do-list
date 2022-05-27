console.log("client connected");

$(document).ready(function () {
  console.log("ready!");
});

//function to get all todos
function getTodos() {
  //empty DOM
  $("#taskList").empty();
  $.ajax({
    type: "GET",
    url: "/todo",
  })
    .then((response) => {
      console.log(response);
      //   display(response)
    })
    .catch((err) => {
      console.log("fuck...", err);
    });
}
//function to display all todos and delete button
//function to check off
