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

## Course endpoints

- `GET /api/courses`
- `GET /api/courses/{id}`

The application seeds starter course records automatically when the `courses` table is empty.

## Admin console

Open the signup admin console at:

`http://localhost:8080/admin/signups`

It shows all signup leads stored from the frontend modal.
