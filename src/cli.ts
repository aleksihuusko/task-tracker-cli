#!/usr/bin/env node
// The above line ensures that the script is run with Node.js when executed from the CLI.

import { TaskManager } from "./task-manager";

// Initialize the TaskManager, which handles all task-related operations.
const taskManager = new TaskManager();

// Extract the command-line arguments passed by the user.
const args = process.argv.slice(2); // Slice off the first two default args (node and file path)
const command = args[0]; // The command provided by the user (e.g., 'add', 'update')
const params = args.slice(1); // Additional parameters (like task description, ID, etc.)

// Switch to determine which command was provided.
switch (command) {
  case "add": {
    const description = params.join(" "); // Join all remaining parameters as the task description
    taskManager.addTask(description); // Call the addTask method
    break;
  }

  case "update": {
    const taskId = parseInt(params[0]); // Extract task ID
    const updatedDescription = params.slice(1).join(" "); // Get the new description
    taskManager.updateTask(taskId, updatedDescription); // Call the updateTask method
    break;
  }

  case "delete": {
    taskManager.deleteTask(parseInt(params[0])); // Delete task by ID
    break;
  }

  case "mark-in-progress": {
    taskManager.markTaskInProgress(parseInt(params[0])); // Mark task as 'in-progress'
    break;
  }

  case "mark-done": {
    taskManager.markTaskDone(parseInt(params[0])); // Mark task as 'done'
    break;
  }

  case "list": {
    taskManager.listTasks(params[0]); // List tasks, possibly filtered by status (todo, done, in-progress)
    break;
  }

  default: {
    console.log("Unknown command"); // If an unknown command is provided, show an error.
  }
}
