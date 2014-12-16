var Megatask = function() {
  function Megatask() {
    this.tasks = [];
    this.counter = 0;
    var self = this;
    var supportsStorage = function(){
      try {
        return 'localStorage' in window && window['localStorage'] !=null;
      } catch(e) {
        return false;
      }

    };
    var loadTasks = function() {
      if(supportsStorage() && localStorage.tasks) {
        self.tasks = JSON.parse(localStorage.tasks);
        var totalTasks=self.tasks.length
        for(i=0; i < totalTasks; i++) {
          var oldItem = createListItem(self.tasks[i]);
          $('#tasks').append(oldItem);
        }
      }
    };
    var addTask = function(taskName, taskCompleted) {
        taskCompleted = !!taskCompleted;
        self.counter++;
        var newTask = {
          id: self.counter,
          name: taskName,
          completed: taskCompleted,
        };
        self.tasks.push(newTask);
        var newItem = createListItem(newTask);
        $('#tasks').append(newItem);
        saveTasks();
    };
    var createListItem = function(task) {
      var deleteButton, editButton, buttonGroup, label;
      label = '<label>' + task.name + '</label>';
      deleteButton = '<button class="btn btn-sm btn-danger"><i class="fa fa-trash fa-lg"></i></button>';
      editButton = '<button class="btn btn-sm btn-success edit">edit</button>';
      buttonGroup = '<div class="btn-group">' + deleteButton + editButton + '</div>';
      return '<li class="list-group-item" id="task_' + task.id + '""><div class="task">' + label +
      buttonGroup + '</div></li>';
    };
    var saveTasks = function(){
      if (supportsStorage()){
        localStorage.tasks = JSON.stringify(self.tasks);
      }
    };

    var getListItemFromButton = function(button) {
      return $(button).closest('li');
    };

    var getTaskIdFromListItem = function(listItem) {
      var id = listItem.attr('id');
      return id.substring(id.lastIndexOf('_') + 1);
    };

    $('#new_task').submit(function(ev) {
      ev.preventDefault();
      var field = $(this.elements.task_name);
      addTask(field.val());
      field.val('');
    });
    $('#tasks').on('click', 'button.btn-danger', function() {
      var listItem = getListItemFromButton(this);
      var id = getTaskIdFromListItem(listItem);
      for (var i=0; i < self.tasks.length; i++) {
        if (self.tasks[i].id.toString() === id) {
          self.tasks.splice(i, 1);
        }
      }
      listItem.remove();
      saveTasks();
    });

    $('#tasks').on('click', 'button.edit', function() {
      var editForm = $('.edit_task.hidden').clone();

    });

    loadTasks();
  }
  return Megatask;
}();

var megatask = new Megatask();
