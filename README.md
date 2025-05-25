# Train Schedule Application

Привіт Kevych Solutions! 😎 Дякую за таке цікаве, комплексне тестове завдання! Нижче вже на англійській розписав, як запустити цей застосунок. Створив інструкції й нотатки по запуску. Застосунок написаний використовуючи NestJS, Neon Tech Serverless PostgreSQL, PrismaORM, NextJS, MUI і більше. Прошу оцінити якість коду, враховуючи скільки часу було дано на виконання. Я старався писати чистий, реюзабельний код як і на фронті, так і на бекі. Гарного дня! 😍

## Live Demos

* **Deployed Front-end (Vercel):** [https://kevych-tech-task-front.vercel.app/](https://kevych-tech-task-front.vercel.app/)
* **Deployed Backend (Render):** [https://kevich-tech-task-back.onrender.com](https://kevich-tech-task-back.onrender.com/)
    * *Note: The backend is currently on a paid Render plan for optimal viewing. After the tech task review period, it will be moved to a free starter plan, which may result in server hibernation during inactivity.*
* **Figma UI/UX Design:** [https://www.figma.com/design/cUs4MSK5uQoJaEbh3vvwU8/Kevich-Solutions-Tech-Task--UX-UI-?node-id=1-2&t=eMoqzc9yJBB6sSFw-1](https://www.figma.com/design/cUs4MSK5uQoJaEbh3vvwU8/Kevich-Solutions-Tech-Task--UX-UI-?node-id=1-2&t=eMoqzc9yJBB6sSFw-1)

## Project Overview

This application provides a robust platform for managing train schedules, incorporating features such as:

* **Authorization and Authentication:** Secure user access with JWT-based authentication.
* **CRUD Operations:** Full functionality to create, read, update, and delete train schedules using GET, POST, PUT, PATCH, and DELETE requests.
* **Search and Filtering:** A search field is available with `debouncing` for efficient searching and filtering by train statuses with `throttling`.
* **Pagination:** Proper pagination implementation for managing large datasets.
* **Cloud Deployment:** Both front-end and back-end are deployed to cloud platforms.

All main requirements outlined in the technical task have been thoroughly implemented. (Note that the PUT & PATCH requests were created on backend appropriately, but only PUT utilized on front-end).

## Technologies Used

### Backend

* **Language:** TypeScript 
* **Server:** Nest.js 
* **Database:** Neon Tech Serverless PostgreSQL 
* **ORM:** Prisma ORM
* **Authentication:** JWT

...

### Database (Neon Tech Serverless PostgreSQL)

* **Schema Design:** The database is structured with two main schemas: `users` and `trainSchedules`.
* **Relationships:** A one-to-many relationship is established between `users` and `trainSchedules`, meaning every new train schedule created is linked to a specific user.
* **Data Privacy Philosophy:** The chosen design philosophy ensures that `trainSchedules` are private. Users can only access and manage their own train schedules, and cannot view other users' schedules. While an alternative approach using technologies like WebSocket connections could allow for broader visibility of all posted train schedules, this implementation prioritizes individual user data privacy.

### Front-end

* **Framework:** React.js (Next.js) 
* **Form Validation:** Zod
* **UI Library:** Material-UI (MUI) & My Custom Components
* **API Interface** Postman

...

## API Endpoints

The backend exposes the following API endpoints:

### Auth
* `POST /users/register` - Create a new user
* `POST /users/login` - Log in a user

### Train Schedule
* `GET /train-schedule?page=1&limit=10` - Get paginated train schedules for the authenticated user
    * *Note: you can also chain query params like "&status" and "&searchTerm" for filtering options*

* `GET /train-schedule/:id` - Get a specific train schedule by ID
* `PUT /train-schedule/:id` - Update a train schedule by ID
* `PATCH /train-schedule/:id` - Partially update a train schedule by ID
* `DELETE /train-schedule/:id` - Delete a train schedule by ID
* `POST /train-schedule` - Create a new train schedule
* `GET /` - Health check endpoint

## Getting Started

### Running the Backend

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nikolas-tuz/kevich-tech-task-back.git
    cd kevich-tech-task-back
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the root directory and configure the following environment variables:
    ```
    PORT=3001
    JWT_SECRET=YOUR_VERY_SECRET_KEY_HERE(should be the same for front-end)
    JWT_EXPIRES_AT=8h
    DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
    ALLOW_ORIGIN=http://localhost:3000
    ```
    * `JWT_SECRET`: A strong, unique secret key for JWT signing.
    * `JWT_EXPIRES_AT`: The expiration time for JWTs (e.g., `1h`, `7d`).
    * `DATABASE_URL`: Your PostgreSQL connection string. This project uses Neon Tech serverless PostgreSQL.
    * `ALLOW_ORIGIN`: allowed origin for CORS(single string).
4.  **Run database migrations (if any) and generate Prisma client:**
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```
5.  **Start the development server:**
    ```bash
    npm run start:dev
    ```
    The backend server will typically run on `http://localhost:3001`.

### Running the Front-end

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nikolas-tuz/kevych-tech-task-front.git
    cd kevych-tech-task-front
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env.local` file** in the root directory and configure the following environment variable:
    ```
    NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
    ```
    * `NEXT_PUBLIC_BACKEND_URL`: The URL of your deployed or local backend server.
4.  **Create a `.env` file** in the root directory and configure the following environment variable:
    ```
    JWT_SECRET=YOUR_VERY_SECRET_KEY_HERE
    ```
    * `JWT_SECRET`: This should be the **same secret key** as used in your backend's `JWT_SECRET`.
5.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The front-end application will typically run on `http://localhost:3000`.

## Potential Improvements

* **Responsiveness:** Due to time constraints, the application is not fully responsive across all devices. This would be a key area for future improvement.
* **Advanced Search:** The current searching implementation using Prisma has limitations. Leveraging native SQL for more complex and performant search queries would be beneficial.
* **Caching Results:** It would be very noice 😎 to actually cache the train data using e.g. Redis or cache storage on front-end.

Love you, Kevych Solutions!
