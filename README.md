# 🎓 Advanced Academic Guidance - College Finder & Fee Comparison

A comprehensive full-stack application designed to help students and parents find the right college based on degree, location, and budget. The platform provides detailed fee breakdowns, including tuition, hostel, and one-time fees, and features a seamless enquiry system.

---

## 🚀 Features

### For Students
- **Smart Filtering**: Search colleges by Degree (BCA, BE, MBA, etc.), District, and Annual Fee range.
- **Detailed College Profiles**: View full descriptions, offered degrees, images, and comprehensive fee structures.
- **Unified Fee System**: Compare Annual Tuition, Hostel (AC/Non-AC + Mess Fees), and One-Time Fees in one place.
- **Automatic Image Slideshows**: Visually explore campus life with dynamic image sliders.
- **Enquiry System**: Directly contact colleges by submitting enquiries with name, phone, and email.

### For Admins
- **Secure Authentication**: Protected login system using hashed passwords (bcrypt).
- **College Management**: Full CRUD (Create, Read, Update, Delete) capabilities for college listings.
- **Enquiry Dashboard**: View and manage all student enquiries in real-time.
- **Fee Configuration**: Detailed management of hostel and one-time fee structures for each institution.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React.js](https://reactjs.org/) (Powered by [Vite](https://vitejs.dev/))
- **Routing**: [React Router](https://reactrouter.com/)
- **Charts/Data**: [Recharts](https://recharts.org/)
- **API Client**: [Axios](https://axios-http.com/)
- **Styling**: Modern CSS / Glassmorphism Design

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/) (using `mysql2` driver)
- **Security**: `bcrypt` for password hashing, CORS for secure cross-origin requests.

---

## 🗄️ Database Architecture

The application uses a relational MySQL database with the following core tables:

- **`colleges`**: Stores institution name, district, base fees, description, and image paths.
- **`hostel_fees`**: Stores detailed hostel options (AC/Non-AC, Yearly Rent, Mess Fees, and Total).
- **`one_time_fees`**: Captures admission fees, caution deposits, and other non-recurring costs.
- **`enquiries`**: Logs student contact information, interested degrees, and timestamps.
- **`admin`**: Stores administrative credentials securely.

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MySQL Server running

### 1. Database Setup
1. Create a database named `college_agency_db`.
2. Import the schema and initial data using the `backend/database.sql` file.

### 2. Backend Configuration
1. Navigate to the `backend` folder.
2. Run `npm install`.
3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=college_agency_db
   JWT_SECRET=your_secret_key
   ```

### 3. Frontend Configuration
1. Navigate to the `frontend` folder.
2. Run `npm install`.

---

## 🏃‍♂️ Running the Application

For convenience, a batch script is provided at the root to start both servers simultaneously:

1. Open a terminal in the project root.
2. Run:
   ```bash
   ./start_app.bat
   ```
3. The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:5000`.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/colleges` | Fetch all colleges |
| **GET** | `/api/colleges/filter` | Search colleges with query params |
| **GET** | `/api/colleges/:id` | Get detailed information for a specific college |
| **POST** | `/api/enquiries` | Submit a student enquiry |
| **POST** | `/api/admin/login` | Admin authentication |

---

## 📂 Project Structure

```text
├── backend/
│   ├── routes/          # API Route definitions
│   ├── config/          # Database configuration
│   ├── database.sql     # SQL Schema and Seed data
│   ├── server.js        # Entry point for the backend
│   └── scripts/         # Utility scripts for data population
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Main views (Home, Details, Admin)
│   │   └── App.jsx      # Main application logic
│   └── public/          # Static assets and images
└── start_app.bat        # Automated startup script
```
