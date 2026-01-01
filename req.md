# 🎓 College Agency App – Build Prompt

## 📌 Project Title

**College Agency Application with Advanced Filters and Enquiry System**

---

## 🎯 Objective

Build a full‑stack **College Agency App** that allows users to search and filter colleges based on **degree, district, and fee range**, and enables students to **send enquiries** by providing phone number and email. The backend must be built using **Node.js + Express.js** and the database must use **SQL (MySQL)**.

---

## 🧑‍🎓 Target Users

* Students / Parents – search colleges and submit enquiries
* Admin (Agency) – manage colleges and view enquiries

---

## 🔍 Core Features

### 1️⃣ College Listing

* Display list of colleges
* Show:

  * College Name
  * Degree Offered
  * District
  * Annual Fees

---

### 2️⃣ Filter Colleges

Provide filter options:

#### ✅ Degree Filter

* Dropdown or checkbox
* Example: BCA, BSc, BE, MBA, MCA

#### ✅ District Filter

* Dropdown list of districts

#### ✅ Fees Range Filter

* Minimum and Maximum fee range
* Slider or two input fields

Filtering should work using SQL queries with `BETWEEN` condition.

---

### 3️⃣ College Details Page

When user selects a college:

* Display full details
* Show degrees offered
* Show fee structure
* Include **Enquire Now** button

---

### 4️⃣ Enquiry System

#### Enquiry Form Fields

* Student Name
* Phone Number (required)
* Email ID (required)
* Interested Degree
* Message (optional)

#### Validation Rules

* Phone number must be 10 digits
* Email must be in valid format

On submit:

* Store enquiry in SQL database
* Show success message

---

## 🗄️ Database Design (MySQL)

### Colleges Table

```sql
CREATE TABLE colleges (
  college_id INT AUTO_INCREMENT PRIMARY KEY,
  college_name VARCHAR(200),
  degree VARCHAR(100),
  district VARCHAR(100),
  fees INT,
  description TEXT
);
```

### Enquiries Table

```sql
CREATE TABLE enquiries (
  enquiry_id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(150),
  phone VARCHAR(15),
  email VARCHAR(150),
  interested_degree VARCHAR(100),
  college_id INT,
  enquiry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (college_id) REFERENCES colleges(college_id)
);
```

---

## 🛠️ Technology Stack

### Backend

* Node.js
* Express.js
* MySQL
* mysql2 library

### Frontend (Any One)

* React.js
* HTML, CSS, JavaScript

---

## 🌐 API Requirements

### Get All Colleges

* `GET /api/colleges`

### Filter Colleges

* `GET /api/colleges/filter`
* Query Params:

  * degree
  * district
  * minFee
  * maxFee

### Submit Enquiry

* `POST /api/enquiries`
* Accept JSON body

---

## 🔐 Security Requirements

* Use prepared statements to prevent SQL Injection
* Validate user inputs

---

## 🎓 Viva Explanation Summary

This application uses Express.js to build REST APIs and MySQL as a relational database. Users can filter colleges using SQL conditions, including fee range filters. Enquiry details are securely stored and managed by the agency.

---

## 🔐 Admin Login Module

### Admin Authentication

* Secure admin login using username and password
* Only admins can access management features

### Admin Capabilities

* Login & Logout functionality
* Add new colleges
* Edit existing college details
* Delete colleges
* View all student enquiries

### Admin Table (MySQL)

```sql
CREATE TABLE admin (
  admin_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);
```

### Admin Login API
* `POST /api/admin/login`
* Validates admin credentials using SQL
* Uses hashed passwords for security

### Security Measures

* Password hashing (bcrypt)
* Prepared statements to prevent SQL Injection
* Protected admin routes

---

## ⭐ Optional Enhancements

* Admin dashboard with charts
* Sort colleges by fees
* Search by college name
* Export enquiries to Excel

---

## 📌 Instruction to Builder

> Build this application strictly using Express.js for backend and SQL for database. Focus on clean architecture, proper validation, and filter functionality.
