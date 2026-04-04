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
    description TEXT NOT NULL,
    price INT NOT NULL,
    why_learn TEXT NOT NULL,
    toolchain_overview TEXT NOT NULL,
    faq_content TEXT NOT NULL,
    readme_content TEXT NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE courses ADD COLUMN IF NOT EXISTS why_learn TEXT NULL;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS toolchain_overview TEXT NULL;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS faq_content TEXT NULL;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS readme_content TEXT NULL;

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

CREATE TABLE IF NOT EXISTS blogs (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(180) NOT NULL,
    summary VARCHAR(500) NOT NULL,
    content VARCHAR(12000) NOT NULL,
    category VARCHAR(80) NOT NULL,
    author_name VARCHAR(120) NOT NULL,
    cover_image_url VARCHAR(500),
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id)
);
