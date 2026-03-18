CREATE TABLE IF NOT EXISTS signup_leads (
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(120) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    source VARCHAR(40) NOT NULL,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS courses (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(2000) NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS course_enquiries (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone_country_code VARCHAR(8) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    company_name VARCHAR(160) NOT NULL,
    team_size VARCHAR(40) NOT NULL,
    preferred_training_mode VARCHAR(40) NOT NULL,
    course_id BIGINT NOT NULL,
    course_title VARCHAR(150) NOT NULL,
    message VARCHAR(2000),
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id)
);
