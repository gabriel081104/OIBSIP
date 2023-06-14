// Task Data Structure
function Task(id, text, completed) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
  
  // Task Manager
  const taskManager = {
    tasks: [],
    currentId: 1,
  
    addTask: function(text) {
      const task = new Task(this.currentId, text, false);
      this.tasks.push(task);
      this.currentId++;
    },
  
    deleteTask: function(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
  
    toggleTaskCompletion: function(id) {
      this.tasks.forEach(task => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
      });
    },
  
    getPendingTasks: function() {
      return this.tasks.filter(task => !task.completed);
    },
  
    getCompletedTasks: function() {
      return this.tasks.filter(task => task.completed);
    }
  };
  
  // UI Manager
  const uiManager = {
    taskInput: document.getElementById("task-input"),
    pendingTasksList: document.getElementById("pending-tasks"),
    completedTasksList: document.getElementById("completed-tasks"),
  
    clearTaskInput: function() {
      this.taskInput.value = "";
    },
  
    createTaskElement: function(task) {
      const taskElement = document.createElement("li");
      taskElement.classList.add("task");
  
      const taskText = document.createElement("span");
      taskText.classList.add("task-text");
      taskText.textContent = task.text;
  
      const taskButtons = document.createElement("div");
      taskButtons.classList.add("task-buttons");
  
      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";
      completeButton.addEventListener("click", () => {
        taskManager.toggleTaskCompletion(task.id);
        this.renderTasks();
      });
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        taskManager.deleteTask(task.id);
        this.renderTasks();
      });
  
      taskButtons.appendChild(completeButton);
      taskButtons.appendChild(deleteButton);
  
      taskElement.appendChild(taskText);
      taskElement.appendChild(taskButtons);
  
      if (task.completed) {
        taskElement.classList.add("completed");
      }
  
      return taskElement;
    },
  
    renderTasks: function() {
      this.pendingTasksList.innerHTML = "";
      this.completedTasksList.innerHTML = "";
  
      const pendingTasks = taskManager.getPendingTasks();
      const completedTasks = taskManager.getCompletedTasks();
  
      pendingTasks.forEach(task => {
        const taskElement = this.createTaskElement(task);
        this.pendingTasksList.appendChild(taskElement);
      });
  
      completedTasks.forEach(task => {
        const taskElement = this.createTaskElement(task);
        this.completedTasksList.appendChild(taskElement);
      });
  
      this.clearTaskInput();
    }
  };
  
  // Event Listeners
  function addTask() {
    const taskText = uiManager.taskInput.value.trim();
  
    if (taskText !== "") {
      taskManager.addTask(taskText);
      uiManager.renderTasks();
    }
  }
  
  // Initial Render
  uiManager.renderTasks();
  