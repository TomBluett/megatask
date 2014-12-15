var Megatask = function() {
  function Megatask() {
    this.tasks = [];
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
        var newTask = {
          name: taskName,
          completed: taskCompleted
        };
        self.tasks.push(newTask);
        var newItem = createListItem(newTask);
        $('#tasks').append(newItem);
        saveTasks();
    };
    var createListItem = function(task) {
      return '<li class="list-group-item">' + task.name + '</li>'
    };
    var saveTasks = function(){
      if (supportsStorage()){
        localStorage.tasks = JSON.stringify(self.tasks);
      }
    };

    $('#new_task').submit(function(ev) {
      ev.preventDefault();
      var field = $(this.elements.task_name);
      addTask(field.val());
      field.val('');
    });

    loadTasks();
  }
  return Megatask;
}();

var megatask = new Megatask();
