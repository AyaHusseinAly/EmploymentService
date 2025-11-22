-- Note: This schema is written and tested on PostgreSQL.
-- Other RDBMS (MySQL, SQL Server, SQLite) may require minor adjustments 
-- such as replacing SERIAL with AUTO_INCREMENT/IDENTITY and adapting boolean types to BIT for SQL server case.


-- Drop existing tables
DROP TABLE IF EXISTS "Salaries";
DROP TABLE IF EXISTS "Users";

-- Users table
CREATE TABLE "Users" (
  "ID" SERIAL PRIMARY KEY,
  "Username" VARCHAR(100) NOT NULL,
  "NationalNumber" VARCHAR(50) NOT NULL UNIQUE,
  "Email" VARCHAR(255),
  "Phone" VARCHAR(50),
  "IsActive" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Salaries table
CREATE TABLE "Salaries" (
  "ID" SERIAL PRIMARY KEY,
  "Year" INT NOT NULL,
  "Month" INT NOT NULL CHECK ("Month" BETWEEN 1 AND 12),
  "Salary" NUMERIC(12,2) NOT NULL CHECK ("Salary" >= 0),
  "UserID" INT NOT NULL,
  CONSTRAINT fk_salaries_user
    FOREIGN KEY ("UserID") REFERENCES "Users"("ID")
    ON DELETE CASCADE
);

-- index for faster lookups by NationalNumber
CREATE INDEX idx_users_nationalnumber ON "Users"("NationalNumber");

-- composite index for faster salary queries per user and for future use as commonly we may order data specififc year/month
CREATE INDEX idx_salaries_user_year_month ON "Salaries"("UserID", "Year", "Month");