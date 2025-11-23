## Employee Status and Salary Statistics Web Service
This project provides an API endpoint to retrieve employee information and salary statistics.  

### 1. Setting Environment Variables

Create a `.env` file in the project root with the following variables:

- DB_HOST=localhost
- DB_PORT=5432
- DB_NAME=getempstatus_db
- DB_USER=your_username
- DB_PASSWORD=your_password
- DB_DIALECT=postgres
- NODE_ENV=development

### 2. Setup & Execution Instructions

#### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- PostgreSQL database running with the above credentials

#### Installation & Running the Server
```bash
git clone <repo-url>
cd <project-folder>
npm install
npm start
```
### 3. Database Setup
Run the SQL files `./db/schema.sql` and `./db/seed.sql` to initialize the database.


then import the provided Postman Collection and test the end point for different cases
