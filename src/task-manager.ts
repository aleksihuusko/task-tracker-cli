import * as fs from "fs";
import * as path from "path";

// Define the Task interface that outlines the structure of a task.
interface Task {
  id: number;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
}

// Define the path to the JSON file where tasks are stored.
const FILE_PATH = path.join(__dirname, "../tasks.json");

// TaskManager class handles all task-related operations like adding, updating, deleting, and listing tasks.
export class TaskManager {
  private tasks: Task[] = []; // Array to hold the list of tasks

  constructor() {
    this.loadTasks(); // Load tasks from the JSON file when the TaskManager is initialized
  }

  // Load tasks from the JSON file.
  private loadTasks() {
    try {
      if (fs.existsSync(FILE_PATH)) {
        // Check if the file exists
        const data = fs.readFileSync(FILE_PATH, "utf-8"); // Read the file contents
        if (data.trim().length > 0) {
          // If the file is not empty, parse it as JSON
          this.tasks = JSON.parse(data);
        } else {
          this.tasks = []; // If the file is empty, initialize an empty task array
        }
      } else {
        this.tasks = []; // If the file doesn't exist, initialize an empty task array
      }
    } catch (error) {
      console.error("Error loading tasks:", error); // Handle any errors during file read/parse
      this.tasks = []; // If an error occurs, initialize an empty task array
    }
  }

  // Save the current tasks array to the JSON file.
  private saveTasks() {
    fs.writeFileSync(FILE_PATH, JSON.stringify(this.tasks, null, 2)); // Write the tasks to the file in a formatted JSON
  }

  // Add a new task with a description.
  public addTask(description: string) {
    const newTask: Task = {
      id: this.tasks.length + 1, // Generate a unique ID for the new task
      description,
      status: "todo", // Default status is 'todo'
      createdAt: new Date().toISOString(), // Record the creation time
      updatedAt: new Date().toISOString(), // Initially, createdAt and updatedAt are the same
    };
    this.tasks.push(newTask); // Add the new task to the tasks array
    this.saveTasks(); // Save the updated tasks array to the JSON file
    console.log(`Task added successfully (ID: ${newTask.id})`); // Confirm the addition
  }

  // Update the description of an existing task by ID.
  public updateTask(id: number, description: string) {
    const task = this.tasks.find((t) => t.id === id); // Find the task by its ID
    if (task) {
      task.description = description; // Update the description
      task.updatedAt = new Date().toISOString(); // Update the updatedAt field
      this.saveTasks(); // Save the updated tasks array
      console.log(`Task ${id} updated`);
    } else {
      console.log(`Task with ID ${id} not found`); // Handle case where the task ID doesn't exist
    }
  }

  // Delete a task by ID.
  public deleteTask(id: number) {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id); // Remove the task with the specified ID
    if (this.tasks.length < initialLength) {
      this.saveTasks(); // Save the updated tasks array
      console.log(`Task ${id} deleted`); // Confirm deletion
    } else {
      console.log(`Task with ID ${id} not found`); // Handle case where the task ID doesn't exist
    }
  }

  // Mark a task as 'in-progress' by updating its status.
  public markTaskInProgress(id: number) {
    this.updateTaskStatus(id, "in-progress"); // Call the helper method to update the task's status
  }

  // Mark a task as 'done' by updating its status.
  public markTaskDone(id: number) {
    this.updateTaskStatus(id, "done"); // Call the helper method to update the task's status
  }

  // Helper method to update the status of a task.
  private updateTaskStatus(
    id: number,
    status: "todo" | "in-progress" | "done"
  ) {
    const task = this.tasks.find((t) => t.id === id); // Find the task by its ID
    if (task) {
      task.status = status; // Update the task's status
      task.updatedAt = new Date().toISOString(); // Update the updatedAt timestamp
      this.saveTasks(); // Save the updated tasks array
      console.log(`Task ${id} marked as ${status}`); // Confirm status update
    } else {
      console.log(`Task with ID ${id} not found`); // Handle case where the task ID doesn't exist
    }
  }

  // List tasks, optionally filtered by status ('todo', 'done', 'in-progress').
  public listTasks(status?: string) {
    let filteredTasks = this.tasks; // Start with all tasks
    if (status) {
      // Filter tasks based on the provided status
      filteredTasks = this.tasks.filter((t) => t.status === status);
    }

    // If no tasks match, log an empty result.
    if (filteredTasks.length === 0) {
      console.log(`No tasks found with status: ${status || "all"}`);
      return;
    }

    // Print each task in a formatted manner.
    filteredTasks.forEach((task) => {
      console.log(
        `[${task.id}] ${task.description} - ${task.status} (created: ${task.createdAt}, updated: ${task.updatedAt})`
      );
    });
  }
}
