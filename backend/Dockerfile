# syntax=docker/dockerfile:1.7
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY backend/pom.xml ./pom.xml
RUN --mount=type=cache,target=/root/.m2 mvn -B dependency:go-offline

COPY backend/src ./src

RUN --mount=type=cache,target=/root/.m2 mvn -B clean package -DskipTests

FROM gcr.io/distroless/java21-debian12:nonroot
WORKDIR /app

COPY --from=build --chown=nonroot:nonroot /app/target/lead-service-0.0.1-SNAPSHOT.jar app.jar
COPY --chown=nonroot:nonroot index.html /app/frontend/index.html
COPY --chown=nonroot:nonroot assets /app/frontend/assets
COPY --chown=nonroot:nonroot components /app/frontend/components
COPY --chown=nonroot:nonroot pages /app/frontend/pages

USER nonroot:nonroot

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/app.jar"]
