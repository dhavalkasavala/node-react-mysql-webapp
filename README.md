# Node-React-MySQL Auth App

A full-stack authentication application built with **Node.js**, **Express**, **MySQL**, **React**, and **Tailwind CSS**. Features include:

- User **Signup** and **Login** with JWT authentication
- **Admin Dashboard** to create new users
- **Role-based access control**
- Tailwind CSS for responsive and modern UI
- Auto-login after signup and logout functionality

---

## Tech Stack

- **Backend:** Node.js, Express, MySQL, bcrypt, JWT  
- **Frontend:** React, Axios, Tailwind CSS  
- **Database:** MySQL  


---

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your MySQL and JWT secrets:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=auth_db
JWT_ACCESS_SECRET=youraccesstokensecret
JWT_REFRESH_SECRET=yourrefreshtokensecret
```

4. Start the backend server:

```bash
node server.js
```

> The backend runs on `http://localhost:5000`.

### 2. Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Configure Tailwind in `tailwind.config.js`:

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

5. Include Tailwind in `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Start the frontend:

```bash
npm start
```

> The frontend runs on `http://localhost:3000`.

---

## Features

* **Signup & Auto-login:** Users can sign up and logged in.
* **Login:** Existing users can log in with email and password.
* **Admin Dashboard:** Admin users can create new users and assign roles.
* **Logout:** Clears session and JWT token.
* **Tailwind CSS:** Responsive and modern UI components.

---

## API Endpoints

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| POST   | `/auth/signup`      | Register a new user      |
| POST   | `/auth/login`       | Login user               |
| POST   | `/auth/create-user` | Create user (admin only) |
| GET    | `/auth/refresh`     | Refresh JWT access token |

---

## Environment Variables

* `DB_HOST` – MySQL host (e.g., localhost)
* `DB_USER` – MySQL username
* `DB_PASSWORD` – MySQL password
* `DB_NAME` – MySQL database name
* `JWT_ACCESS_SECRET` – Secret key for access token
* `JWT_REFRESH_SECRET` – Secret key for refresh token

---
