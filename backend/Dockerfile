# syntax=docker/dockerfile:1.7
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -B dependency:go-offline

COPY src ./src

RUN --mount=type=cache,target=/root/.m2 mvn -B clean package -DskipTests

FROM gcr.io/distroless/java21-debian12:nonroot
WORKDIR /app

COPY --from=build --chown=nonroot:nonroot /app/target/lead-service-0.0.1-SNAPSHOT.jar app.jar

USER nonroot:nonroot

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/app.jar"]
