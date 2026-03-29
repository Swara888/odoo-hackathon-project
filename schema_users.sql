-- ENUM for roles
CREATE TYPE user_role AS ENUM ('Admin', 'Manager', 'Employee');

-- COMPANIES TABLE
CREATE TABLE Companies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  default_currency VARCHAR(3) NOT NULL
	CHECK (default_currency ~ '^[A-Z]{3}$'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USERS TABLE
CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
    CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  password_hash TEXT NOT NULL,
  role user_role NOT NULL,
  company_id INT NOT NULL
    REFERENCES Companies(id) ON DELETE CASCADE,
  manager_id INT
    REFERENCES Users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE Users
ADD COLUMN is_manager_approval BOOLEAN DEFAULT TRUE;

ALTER TABLE Users
ALTER COLUMN is_manager_approval SET DEFAULT FALSE;