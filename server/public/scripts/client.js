console.log("client connected");

$(document).ready(function () {
  console.log("ready!");
  $("#submitBtn").on("click", addTask);
  $(document).on("click", ".deleteBtn", deleteTodo);
  $(document).on("click", ".task", checkOff);
  getTodos();
});

//function to add task
function addTask() {
  let newTask = $("#input").val();
  if (newTask === "") {
    return;
  }

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
      $("#input").val("");
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
    <div class="todoDiv" data-id=${todo.id} data-complete=${todo.complete}>
        <li class="task list-group-item d-flex justify-content-between align-items-center">${todo.task} <span class="badge bg-danger rounded-pill deleteBtn">X</span></li>
    </div>
      `);
    if (todo.complete === true) {
      $(".task").last().addClass("text-decoration-line-through");
    } else if (todo.complete === false) {
      $(".task").last().addClass("text-decoration-none");
    }
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
  swal({
    title: "Delete task?",
    text: "like you actually did it? Bet you didn't lazy bones",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      let id = $(this).parents("div").data("id");
      $.ajax({
        method: "DELETE",
        url: `/todo/${id}`,
        data: id,
      }).then(() => {
        console.log("Deleted");
        getTodos();
      });
      swal("Ok just lie to yourself then", {
        icon: "success",
      });
    } else {
      swal("Thats what I thought");
    }
  });
}

//function to check off

function checkOff() {
  let checkedItem = $(this).parents("div").data("id");
  let isChecked = $(this).parents("div").data("complete");
  console.log(isChecked);
  const checkedObject = {
    complete: !isChecked,
  };
  $.ajax({
    method: "PUT",
    url: `/todo/${checkedItem}`,
    data: checkedObject,
  })
    .then(() => {
      console.log("Puter there");
      getTodos();
    })
    .catch((err) => {
      console.log("Damn it...", err);
    });
}
