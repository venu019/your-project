# Student Management Application

This repository contains a full-stack Student Management System with:

- **Frontend:** React application for managing students with login, CRUD operations, PDF export, and print functionality.
- **Backend:** Spring Boot REST API connected to a MySQL database for data persistence and business logic.

---

## Prerequisites

- **Java 17+** and **Maven** installed and configured in PATH (backend)
- **Node.js** (v16 or higher) and **npm** installed (frontend)
- **MySQL** installed and running on localhost (or update config if remote)

---

## Backend Setup and Run

1. Navigate to the backend folder (if zipped, unzip first):

```
cd backend
```

2. Open `src/main/resources/application.properties` and update your MySQL credentials:

```
spring.datasource.url=jdbc:mysql://localhost:3306/learnzo
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

3. Build the backend project with Maven:

```
mvn clean package
```

4. Run the backend service:

```
mvn spring-boot:run
```

The backend API will start at: `http://localhost:8080`

---

## Frontend Setup and Run

1. Navigate to the frontend folder (root or frontend folder):

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm start
```

The frontend React app will run at: `http://localhost:3000`

---

## How It Works

- The React frontend communicates with the Spring Boot backend at `http://localhost:8080/api`.
- Ensure backend is running before using the frontend.
- Login credentials:  
  - Username: `admin`  
  - Password: `admin123`

---

## Build for Production

To build frontend for production deployment:

```
npm run build
```

This creates a `build/` folder with static files to be deployed on a static hosting service (e.g., Netlify).

---

## Deployment Notes

- **Frontend:** Use Netlify, Vercel, or any static hosting to deploy the content of the `build` folder.
- **Backend:** Deploy the Spring Boot application jar on platforms like Render, Heroku, AWS Elastic Beanstalk, or any cloud server supporting Java.
- Update API base URLs in frontend to point to your deployed backend service (using environment variables or config).

---

## Additional

- For database setup, create MySQL DB `learnzo` or change database name in `application.properties`.
- Use provided Spring Boot entities and REST API endpoints to manage students.
- Frontend supports seat booking, JWT authentication, PDF export, and printing features.

---

## Support

Open issues on this repo for any questions or help.

---

Enjoy your student management app!

```

***

This README is ready to place at the root of your repo and provides clear step-by-step instructions for running and deploying both frontend and backend of your full-stack app.

Let me know if any other specific docs or deployment guides are needed!
