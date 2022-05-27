console.log("client connected");

$(document).ready(function () {
  console.log("ready!");
  $(document).on("click", ".deleteBtn", deleteTodo);
  getTodos();
});

//function to display all todos and delete button
function display(response) {
  console.log(response);
  for (let i = 0; i < response.length; i++) {
    let todo = response[i];
    $("#taskList").append(`
    <div class="todoDiv" data-id=${todo.id}>
        <li>${todo.task}</li><button class="deleteBtn">Delete</button>
    </div>
      `);
  }
}

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
      display(response);
    })
    .catch((err) => {
      console.log("fuck...", err);
    });
}
//function to delete
function deleteTodo() {
  let id = $(this).parents("div").data("id");
  $.ajax({
    method: "DELETE",
    url: `/todo/${id}`,
    data: id,
  }).then(() => {
    console.log("Deleted");
    getTodos();
  });
}

//function to check off
