# syntax=docker/dockerfile:1.7
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -B dependency:go-offline

COPY src ./src

RUN --mount=type=cache,target=/root/.m2 mvn -B clean package -DskipTests

FROM gcr.io/distroless/java17-debian12:nonroot
WORKDIR /app

COPY --from=build /app/target/lead-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/app.jar"]
