# LearnSphere Lead Service

This Spring Boot service stores signup leads from the frontend modal into MySQL.
It also serves course data for the frontend.

## Prerequisites

- Java 17
- Maven 3.9+
- MySQL 8+

## Database

Create a database named `learnsphere`.

```sql
CREATE DATABASE learnsphere;
```

Default connection settings:

- `DB_URL=jdbc:mysql://localhost:3306/learnsphere`
- `DB_USERNAME=root`
- `DB_PASSWORD=root`

You can override them with environment variables before starting the app.

## Run the backend

```bash
mvn spring-boot:run
```

Run from:

```text
backend/
```

The API will start on `http://localhost:8080`.

## Run with Docker Compose

From the project root:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost`
- Backend: `http://localhost:8080`
- MySQL: `localhost:3306`

## Signup endpoint

`POST /api/leads/signup`

Request body:

```json
{
  "email": "user@example.com",
  "phoneNumber": "9876543210"
}
```

## Course enquiry endpoint

`POST /api/leads/course-enquiry`

Request body:

```json
{
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "phoneCountryCode": "+91",
  "phoneNumber": "9876543210",
  "courseId": 1,
  "message": "Need weekend batch details"
}
```

## Course endpoints

- `GET /api/courses`
- `GET /api/courses/{id}`
- `POST /api/courses` with `Authorization: Bearer <admin-token>`

The application seeds starter course records automatically when the `courses` table is empty.

## Admin console

Open the signup admin console at:

`http://localhost:8080/admin/signups`

It shows all signup leads stored from the frontend modal.

Open the course enquiry admin console at:

`http://localhost:8080/admin/course-enquiries`

It shows all course enquiries submitted from the frontend enquiry form.

These `/admin/*` pages are protected with HTTP Basic authentication.

Default admin console credentials:

- Username: `admin`
- Password: `Admin@123`

You can override them with `ADMIN_CONSOLE_USERNAME` and `ADMIN_CONSOLE_PASSWORD`.

The protected admin API for `POST /api/courses` uses the same HTTP Basic username/password.
