console.log("client connected");

$(document).ready(function () {
  console.log("ready!");
  $("#submitBtn").on("click", addTask);
  $(document).on("click", ".deleteBtn", deleteTodo);
  getTodos();
});

//function to add task
function addTask() {
  let newTask = $("#input").val();
  let data = {
    task: newTask,
  };
  $.ajax({
    type: "POST",
    url: "/todo",
    data: data,
  })
    .then(() => {
      console.log("new task success");
      getTodos();
    })
    .catch((err) => {
      console.log("Fer cryin out loud...", err);
    });
}

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
