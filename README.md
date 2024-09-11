# Task Tracker CLI

Task Tracker CLI is a command-line application built in TypeScript to help you manage tasks efficiently. It allows you to add, update, delete, and track tasks, while saving the tasks in a JSON file for persistence.

## Features

- Add new tasks
- Update task descriptions
- Delete tasks
- Mark tasks as in-progress or done
- List all tasks or filter tasks by status (todo, in-progress, done)
- Tasks are stored in a `tasks.json` file

## Installation

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **TypeScript**: Ensure TypeScript is installed as a development dependency.

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/task-tracker-cli.git
   cd task-tracker-cli
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Build the project**:

   Compile the TypeScript code:

   ```bash
   npm run build
   ```

4. **Link the CLI globally**:

   To use the `task-cli` command globally, run:

   ```bash
   npm link
   ```

   This will make the `task-cli` command available system-wide.

## Usage

Once you've linked the CLI, you can use the `task-cli` command to interact with the Task Tracker.

### Available Commands

#### 1. Add a New Task

Use the `add` command to create a new task.

```bash
task-cli add "Task description"
```

**Example**:

```bash
task-cli add "Finish the project report"
```

#### 2. Update a Task

Use the `update` command to modify the description of an existing task by its ID.

```bash
task-cli update <task_id> "Updated description"
```

**Example**:

```bash
task-cli update 1 "Finish the project report and submit"
```

#### 3. Delete a Task

Use the `delete` command to remove a task by its ID.

```bash
task-cli delete <task_id>
```

**Example**:

```bash
task-cli delete 1
```

#### 4. Mark a Task as In Progress

Use the `mark-in-progress` command to update the status of a task to `in-progress`.

```bash
task-cli mark-in-progress <task_id>
```

**Example**:

```bash
task-cli mark-in-progress 1
```

#### 5. Mark a Task as Done

Use the `mark-done` command to update the status of a task to `done`.

```bash
task-cli mark-done <task_id>
```

**Example**:

```bash
task-cli mark-done 1
```

#### 6. List All Tasks

Use the `list` command to view all tasks.

```bash
task-cli list
```

**Example**:

```bash
task-cli list
```

#### 7. List Tasks by Status

You can filter tasks by their status using the `list` command followed by the status (`todo`, `in-progress`, or `done`).

```bash
task-cli list <status>
```

**Examples**:

- List all tasks marked as `done`:

  ```bash
  task-cli list done
  ```

- List all tasks marked as `in-progress`:

  ```bash
  task-cli list in-progress
  ```

- List all tasks that are yet to be done:
  ```bash
  task-cli list todo
  ```

### Task Properties

Each task has the following properties:

- **id**: A unique identifier for the task.
- **description**: The description of the task.
- **status**: The status of the task (`todo`, `in-progress`, `done`).
- **createdAt**: The date and time when the task was created.
- **updatedAt**: The date and time when the task was last updated.

### Example JSON Structure

Tasks are stored in a JSON file located in the project directory as `tasks.json`. Here's an example of how tasks are stored:

```json
[
  {
    "id": 1,
    "description": "Finish the project report",
    "status": "in-progress",
    "createdAt": "2024-09-10T12:34:56.789Z",
    "updatedAt": "2024-09-10T14:23:44.456Z"
  },
  {
    "id": 2,
    "description": "Review the design documents",
    "status": "done",
    "createdAt": "2024-09-10T13:45:12.123Z",
    "updatedAt": "2024-09-10T15:11:22.987Z"
  }
]
```

## Uninstalling

If you want to remove the global `task-cli` command, you can unlink it using:

```bash
npm unlink -g
```

## Development

### Running the CLI Locally

To test the CLI without linking globally, you can run it using:

```bash
node dist/cli.js <command> [args]
```

### Build the Project

To recompile the TypeScript code after making changes:

```bash
npm run build
```

### Testing

Manually test the application by running the various commands listed above. Be sure to check the `tasks.json` file to ensure tasks are saved correctly.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are always welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
