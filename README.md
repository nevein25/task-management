# Task Management Application

## Project Overview

This task management application allows users to create, update, view, and delete tasks. It includes user authentication, enabling users to sign up, log in, and manage their tasks. The application is built using React for the frontend and Spring Boot with PostgreSQL for the backend.



### Prerequisites

- Java 17
- Node.js and npm
- PostgreSQL

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/nevein25/task-management
    ```

2. **Backend Setup:**

    - Navigate to the backend directory:
      ```bash
      cd server
      ```

    - Install dependencies:
      ```bash
      ./mvnw install
      ```

    - Configure PostgreSQL:
      - Update `src/main/resources/application.yml` with your PostgreSQL credentials.

    - Run the Spring Boot application:
      ```bash
      ./mvnw spring-boot:run
      ```
      The database will be seeded automatically upon application startup.

3. **Frontend Setup:**

    - Navigate to the frontend directory:
      ```bash
      cd client
      ```

    - Install dependencies:
      ```bash
      npm install
      ```

    - Start the React application:
      ```bash
      npm start dev
      ```


### Usage

- **Frontend:** Access the application at `http://localhost:3000`.
    - **Registration Page:** Sign up with email and password.
    - **Login Page:** Log in with your credentials.
    - **Task List Page:** View, edit, and delete tasks.
    - **Create Task:** Add new tasks with title, description, status, and due date.
- **Backend:** The API is accessible at `http://localhost:8080/api`.
    - **Registration Endpoint:** `POST /api/auth/register`
    - **Login Endpoint:** `POST /api/auth/login`
    - **Tasks Endpoint:** `GET /api/tasks`, `POST /api/tasks`, `GET /api/tasks/{id}`, `PUT /api/tasks/{id}`, `DELETE /api/tasks/{id}`



### API Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate a user and return a JWT.
- `GET /api/tasks`: Retrieve all tasks.
- `GET /api/tasks/{id}`: Retrieve a specific task by ID.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/{id}`: Update an existing task.
- `DELETE /api/tasks/{id}`: Delete a task by ID.

