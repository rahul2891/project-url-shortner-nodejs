# project-url-shortner-nodejs
/*
1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install all the dependencies.
4. Create a `.env` file in the root of the project and add the following environment variables:
   - `DATABASE_URL=your_database_connection_string`
   - `JWT_SECRET=your_jwt_secret_key`
5. Set up your PostgreSQL database and ensure it is running.
6. Run `npm run db:push` to create the necessary tables in your database.
7. Start the server using `npm run dev`.
8. The server will be running on `http://localhost:8000`. You can use tools like Postman to test the API endpoints.

Make sure to replace `your_database_connection_string` and `your_jwt_secret_key` with actual values before running the project.
*/


/*
Tech Stack Used:
- Node.js
- Express.js
- Drizzle ORM
- PostgreSQL
- nanoid
- Zod

API Endpoints:
- POST /shorten: Shorten a URL
- GET /my-urls: View all shortened URLs for the logged-in user
- DELETE /:id: Delete a specific URL
- GET /:shortCode: Redirect to the original URL using the short code
*/