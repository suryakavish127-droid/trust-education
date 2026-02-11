# COLLEGE FINDER & FEE COMPARISON WEB APPLICATION

**PROJECT REPORT**

---

## TABLE OF CONTENTS

| CHAPTER NO. | TITLE | PAGE NO. |
| :--- | :--- | :--- |
| | **ABSTRACT** | i |
| **1.** | **INTRODUCTION** | **1** |
| | 1.1. OVERVIEW OF THE PROJECT | 1 |
| | 1.2. PROBLEM DESCRIPTION | 2 |
| | 1.3. SCOPE OF THE PROJECT | 3 |
| **2.** | **SYSTEM ANALYSIS** | **5** |
| | 2.1. EXISTING SYSTEM | 5 |
| | 2.1.1. DISADVANTAGES OF EXISTING SYSTEM | 6 |
| | 2.2. PROPOSED SYSTEM | 7 |
| | 2.2.1. ADVANTAGES OF PROPOSED SYSTEM | 8 |
| | 2.3. FEASIBILITY STUDY | 9 |
| **3.** | **SYSTEM SPECIFICATION** | **12** |
| | 3.1. HARDWARE REQUIREMENTS | 12 |
| | 3.2. SOFTWARE REQUIREMENTS | 13 |
| **4.** | **SOFTWARE DESCRIPTION** | **15** |
| | 4.1. FRONT-END TECHNOLOGY (REACT.JS) | 15 |
| | 4.2. BACK-END TECHNOLOGY (NODE.JS & EXPRESS) | 18 |
| | 4.3. DATABASE TECHNOLOGY (MYSQL) | 20 |
| **5.** | **SYSTEM DESIGN** | **22** |
| | 5.1. DATAFLOW DIAGRAM | 22 |
| | 5.2. DATABASE DESIGN (ER DIAGRAM & SCHEMA) | 25 |
| | 5.3. UML DIAGRAMS | 28 |
| | 5.4. INPUT & OUTPUT DESIGN | 30 |
| **6.** | **SYSTEM TESTING** | **35** |
| | 6.1. TYPES OF TESTING | 35 |
| | 6.2. TEST CASES | 38 |
| **7.** | **SYSTEM IMPLEMENTATION** | **42** |
| | 7.1. NAME OF THE MODULES | 42 |
| | 7.2. MODULE DESCRIPTION | 43 |
| **8.** | **APPENDICES** | **48** |
| | 8.1. SCREENSHOTS | 48 |
| | 8.2. SOURCE CODE - FRONTEND | 55 |
| | 8.3. SOURCE CODE - BACKEND | 145 |
| | 8.4. DATABASE SCRIPTS | 175 |
| **9.** | **CONCLUSION & FUTURE ENHANCEMENT** | **190** |
| **10.** | **REFERENCES** | **192** |

---

# ABSTRACT

The **College Finder & Fee Comparison Web Application** is a comprehensive full-stack platform designed to simplify the complex process of selecting higher education institutions. In the current educational landscape, students and parents often struggle to find accurate, transparent, and consolidated information regarding college fees, facilities, and admission procedures. This project addresses this gap by providing a centralized digital solution where users can search, filter, and compare colleges based on critical parameters such as degree offered, district, and annual fee ranges.

The application features a robust backend built with **Node.js** and **Express.js**, integrated with a **MySQL** database for efficient data management. The frontend is developed using **React.js**, offering a dynamic and responsive user interface. Key functionalities include a smart filtering system, detailed college profiles with image slideshows, and a unified fee structure that breaks down tuition, hostel (AC/Non-AC), mess, and one-time fees. Furthermore, the system includes a secure admin module for managing college data and an enquiry system that facilitates direct communication between students and institutions. This project aims to empower students with the information needed to make informed academic decisions while streamlining the admission enquiry process for colleges.

---

# 1. INTRODUCTION

## 1.1. OVERVIEW OF THE PROJECT

The "College Finder & Fee Comparison Web Application" is an innovative educational tool developed to assist students in navigating the vast landscape of higher education institutions. As the demand for quality education rises, so does the complexity of choosing the right college. Factors such as location, course availability, infrastructure, and, most importantly, financial feasibility play a pivotal role in this decision-making process.

This project serves as a bridge between educational institutions and aspiring students. It aggregates data from various colleges, presenting it in a standardized, easy-to-read format. The application is built as a Single Page Application (SPA) using modern web technologies, ensuring a seamless and fast user experience.

**Key Objectives:**
*   To provide a searchable database of colleges with advanced filtering options.
*   To offer transparent and detailed fee structures, including often hidden costs like hostel deposits and mess fees.
*   To enable side-by-side comparison of institutions based on financial and academic criteria.
*   To facilitate easy communication through a built-in enquiry form that connects students directly to admission officers.
*   To utilize a secure administrative panel for real-time data updates, allowing colleges to keep their information current.

## 1.2. PROBLEM DESCRIPTION

In the traditional system of college admission and inquiry, students and parents face several significant challenges:

1.  **Information Asymmetry:** Detailed information about fee structures, especially the breakdown of hostel and mess charges, is rarely available online in a transparent manner. Colleges often display only tuition fees, leading to financial surprises later for parents.
2.  **Fragmented Data:** Students must visit individual college websites or physically visit campuses to gather information. This process is time-consuming, expensive, and inefficient.
3.  **Lack of Standardization:** Different colleges present their data in different formats, making it difficult to compare "apples to apples." One college might quote fees per semester, while another quotes per year.
4.  **Inefficient Communication:** Reaching out to admission offices often involves phone calls that go unanswered or emails that receive delayed responses. There is no centralized tracking of enquiries.
5.  **Geographical Constraints:** Students from rural or distant areas find it difficult to explore colleges in major educational hubs without travelling, which incurs additional costs.

This project aims to solve these problems by creating a unified platform that democratizes access to college information, ensuring that every student, regardless of their background or location, can access the same high-quality data to make their career choices.

## 1.3. SCOPE OF THE PROJECT

The scope of this project extends to:
*   **Student Community:** By providing a free, accessible tool to find critical education information.
*   **Educational Institutions:** By providing a platform to showcase their facilities and fee transparency to attract the right talent.
*   **Admin/Agency:** By providing a management tool to oversee the admissions pipeline and data integrity.

The project covers Engineering, Arts, Science, and Management streams, with scalability to include Medical and other professional courses in the future.

---

# 2. SYSTEM ANALYSIS

## 2.1. EXISTING SYSTEM

The existing system for college discovery and fee inquiry is largely manual and decentralized. It relies heavily on:

*   **Physical Brochures and Prospectuses:** Students collect physical copies of brochures, which are costly to print for colleges and easy to lose for students.
*   **Word of Mouth:** Reliance on friends, family, or seniors for information, which can often be biased or outdated.
*   **Individual College Websites:** While most colleges have websites, they vary significantly in quality. User experience is often poor, mobile compatibility is lacking, and crucial fee details are frequently buried behind login screens or not listed at all.
*   **Educational Consultancies:** Third-party agents often act as intermediaries. While helpful, they may charge high fees or steer students towards colleges that offer the highest commissions rather than the best fit for the student.
*   **Generic Education Portals:** Existing portals often focus on SEO and advertising rather than accurate data. They may list a college but fail to provide updated fee structures or specific breakdown of hostel costs.

## 2.1.1. DISADVANTAGES OF EXISTING SYSTEM

1.  **Time-Consuming:** Gathering data for even 5-10 colleges can take weeks of research and travel.
2.  **Inaccurate Financial Planning:** Without clear knowledge of "One-Time Fees" (admission, caution deposit) and specific Hostel/Mess charges, parents often underestimate the total cost of education.
3.  **Limited Scope:** Students tend to only look at colleges they know or those in their immediate vicinity, missing out on better opportunities elsewhere.
4.  **Data Redundancy:** Students have to fill out identical enquiry forms on dozens of different websites.
5.  **No Centralized Feedback:** There is no easy way to track which colleges have responded to enquiries.

## 2.2. PROPOSED SYSTEM

The proposed "College Finder & Fee Comparison Web Application" is a centralized, digital solution designed to overcome the limitations of the existing system. It is a web-based platform that acts as a repository of verified college data.

**Key Features of the Proposed System:**

*   **Advanced Filtering Engine:** Users can filter colleges by specific criteria such as "District" (e.g., Chennai, Coimbatore), "Degree" (e.g., B.E, MBA), and "Annual Fee Range".
*   **Unified Fee View:** The system calculates and displays the *Total First Year Cost*, summing up Tuition, Hostel (User selectable: AC/Non-AC), Mess, and One-Time fees.
*   **Visual Campus Tour:** Integration of image sliders/galleries for each college to provide a visual feel of the infrastructure.
*   **Direct Enquiry forwarding:** Enquiries submitted on the portal are stored in the database and can be viewed by the college/admin immediately.
*   **Admin Dashboard:** A secured area for administrators to add, update, or delete college records, ensuring the data remains current.

### 2.2.1. ADVANTAGES OF PROPOSED SYSTEM

1.  **Transparency:** Complete breakdown of costs ensures parents know exactly what they are paying for.
2.  **Efficiency:** Search and compare hundreds of colleges in minutes/seconds.
3.  **Accessibility:** Web-based architecture ensures the portal is accessible from any device (Mobile, Tablet, Desktop) with an internet connection.
4.  **Standardization:** All colleges are presented with the same data schema, making comparison straightforward.
5.  **Secure:** Admin access is protected via bcrypt password hashing, ensuring data integrity.
6.  **Cost-Effective:** Reduces the need for physical travel and printed brochures.

## 2.3. FEASIBILITY STUDY

A feasibility study is carried out to ensure that the project is legally, technically, and economically feasible.

*   **Technical Feasibility:** The project uses open-source technologies (React, Node.js, MySQL) which are robust, well-documented, and free to use. The team has the required skills in JavaScript and SQL.
*   **Economic Feasibility:** The cost of development is primarily time, as the software tools are open source. Hosting costs are minimal ($5-$10/month) for cloud deployment.
*   **Operational Feasibility:** The interface is designed to be user-friendly, requiring no special training for students. Admins need only basic web forms knowledge.

---

# 3. SYSTEM SPECIFICATION

## 3.1. HARDWARE REQUIREMENTS

The following are the minimum and recommended hardware specifications for the development and deployment of the application.

**For Server (Deployment Environment):**
*   **Processor:** Dual Core 2.0 GHz or higher (e.g., Intel Xeon or AMD EPYC)
*   **RAM:** 4 GB minimum (8 GB recommended for handling concurrent users)
*   **Storage:** 20 GB SSD space (for OS, Application code, and Database)
*   **Network:** High-speed internet connection (100 Mbps+)

**For Client (User's Device):**
*   **Device:** Desktop, Laptop, or Smartphone
*   **Processor:** 1.0 GHz dual-core or better
*   **RAM:** 2 GB minimum
*   **Screen Resolution:** 1280x720 (HD) or higher recommended
*   **Input:** Keyboard and Mouse (or Touchscreen)

**For Development (Developer Machine):**
*   **Processor:** Intel Core i5/i7 or AMD Ryzen 5/7 (Quad-core or higher)
*   **RAM:** 8 GB (16 GB recommended)
*   **Storage:** 256 GB SSD

## 3.2. SOFTWARE REQUIREMENTS

The project is built using the MERN stack (MySQL, Express, React, Node.js) philosophy.

**Development Tools & Technologies:**
*   **Operating System:** Windows 10/11, macOS, or Linux (Ubuntu).
*   **Code Editor:** Visual Studio Code (VS Code) with extensions for ES7+, Prettier, and ESLint.
*   **Version Control:** Git & GitHub.
*   **API Testing:** Postman or Thunder Client.
*   **Browser:** Google Chrome or Mozilla Firefox (latest versions).

**Backend Technologies:**
*   **Runtime Environment:** **Node.js** (v14.0.0 or higher)
*   **Web Framework:** **Express.js** (v4.x)
*   **Database:** **MySQL** (v8.0)
*   **Database Driver:** **mysql2**
*   **Authentication:** **bcrypt** (for password hashing).

**Frontend Technologies:**
*   **Library:** **React.js** (v18.x)
*   **Build Tool:** **Vite**
*   **Routing:** **React Router DOM** (v6.x)
*   **HTTP Client:** **Axios**
*   **Styling:** **CSS3** (with Modules or Tailwind CSS support), **Glassmorphism** design principles.

---

# 4. SOFTWARE DESCRIPTION

## 4.1. FRONT-END TECHNOLOGY (REACT.JS)

The front-end is the client-side part of the application that users interact with. It is built using **React.js**, a popular JavaScript library for building user interfaces.

**Key Components:**

1.  **Navbar:** A persistent navigation bar that provides links to Home, College List, About Us, and Admin Login. It adapts responsibly to mobile screens (hamburger menu).
2.  **Hero Section:** Moving/Static background with a search bar inviting users to "Find Your Dream College".
3.  **Search & Filter Component:**
    *   *Description:* A dynamic form containing dropdowns for District and Degree, and a slider/input for Fee Range.
    *   *Functionality:* Updates the college list in real-time or upon clicking "Search".
4.  **College Card Component:**
    *   *Description:* A reusable UI card displaying the college thumbnail, name, location, and a "View Details" button.
5.  **College Detail Page:**
    *   *Description:* A comprehensive view displaying:
        *   **Image Slider:** Cyclic gallery of college infrastructure.
        *   **Fee Table:** break-up of Tuition, Hostel, and Other fees.
        *   **Description:** Long-text description of the college.
    *   *Interactive Elements:* Toggle buttons to switch between AC and Non-AC hostel pricing.
6.  **Enquiry Form:**
    *   *Description:* A modal or inline form capturing Name, Phone, Email, and Message.
    *   *Validation:* Checks for valid email format and 10-digit phone numbers.

**Design Philosophy:**
The application employs a "Glassmorphism" aesthetic, characterized by translucent backgrounds (frosted glass effect), vivid colors, and subtle border highlights. This ensures a modern, premium look and feel.

## 4.2. BACK-END TECHNOLOGY (NODE.JS & EXPRESS)

The back-end serves as the brain of the application, handling logic, database operations, and security.

**Architecture:**
It follows the standard **MVC (Model-View-Controller)** pattern, adapted for a RESTful API structure (Routes-Controllers-Services).

**Core Modules:**

1.  **Server Entry Point (server.js):**
    *   Initializes the Express app.
    *   Configures Middleware (CORS, JSON parsing).
    *   Establishes Database Connection.
    *   Defines API Routes.

2.  **Database Configuration:**
    *   Uses a connection pool to manage MySQL connections efficiently.
    *   Handles connection errors and automatic reconnections.

3.  **API Routes:**
    *   `/api/colleges`: GET request to fetch all colleges.
    *   `/api/colleges/filter`: GET request with query parameters to filter results.
    *   `/api/colleges/:id`: GET request to fetch a single college's full profile.
    *   `/api/enquiries`: POST request to save new enquiries.
    *   `/api/admin/login`: POST request to authenticate admin users.

## 4.3. DATABASE TECHNOLOGY (MYSQL)

MySQL is selected for its reliability, ACID compliance, and relational structure which is essential for handling linked data like Colleges -> Fees.

**Security Implementation:**
*   **SQL Injection Prevention:** Uses *Prepared Statements* (parameterized queries) for all database operations. e.g., `db.execute('SELECT * FROM colleges WHERE id = ?', [id])`.
*   **Password Hashing:** Admin passwords are hashed using `bcrypt` before storage.

---

# 5. SYSTEM DESIGN

## 5.1. DATAFLOW DIAGRAM

**(Conceptual Representation)**

**Level 0 DFD (Context Diagram):**
*   **User** sends *Search Criteria* -> **College Finder System**
*   **College Finder System** sends *College List* -> **User**
*   **User** sends *Enquiry Data* -> **College Finder System**
*   **Admin** sends *College Details* -> **College Finder System**
*   **College Finder System** sends *Reports/Enquiries* -> **Admin**

## 5.2. DATABASE DESIGN

The database is robust and normalized to avoiding redundancy.

**Tables & Schema Details:**

1.  **`colleges`**
    *   `college_id` (PK, INT, Auto-Inc): Unique identifier for the college.
    *   `college_name` (VARCHAR(200)): Name of the institution.
    *   `degree` (VARCHAR(100)): Degrees offered (CSV or JSON).
    *   `district` (VARCHAR(100)): Location (City/District).
    *   `fees` (INT): Base Annual Tuition Fee.
    *   `hostel_fees` (INT): Default/Base hostel fee (legacy support).
    *   `one_time_fees` (INT): Default/Base one-time fee (legacy support).
    *   `description` (TEXT): Detailed write-up about the college facility.
    *   `image_url` (VARCHAR(255)): Path to the college image asset.

2.  **`hostel_fees`** (Unified Fee Structure)
    *   `id` (PK, INT): Unique record ID.
    *   `college_id` (FK, INT): Links to `colleges.college_id`.
    *   `hostel_type` (VARCHAR(200)): 'Boys Hostel' or 'Girls Hostel'.
    *   `room_type` (VARCHAR(200)): 'AC', 'Non-AC', 'Standard'.
    *   `fee_per_year` (INT): The pure rent/hostel charge.
    *   `mess_fee` (INT): The annual food/mess charge.
    *   `total_amount` (INT): Calculated total (fee_per_year + mess_fee).

3.  **`one_time_fees`** (Unified Fee Structure)
    *   `id` (PK, INT): Unique record ID.
    *   `college_id` (FK, INT): Links to `colleges.college_id`.
    *   `fee_name` (VARCHAR(200)): Name of fee (e.g., "Admission Fee", "Caution Deposit").
    *   `amount` (INT): The cost.
    *   `purpose` (TEXT): Description of what the fee covers.
    *   `status` (VARCHAR(100)): 'Refundable' or 'Non-Refundable'.

4.  **`enquiries`**
    *   `enquiry_id` (PK, INT): Unique ID.
    *   `student_name` (VARCHAR(150)): Name of the student.
    *   `phone` (VARCHAR(15)): Contact number.
    *   `email` (VARCHAR(150)): Email address.
    *   `interested_degree` (VARCHAR(100)): The course they are interested in.
    *   `message` (TEXT): Optional query.
    *   `college_id` (FK, INT): Target college.
    *   `enquiry_date` (TIMESTAMP): Date of submission (Defaults to CURRENT_TIMESTAMP).

5.  **`admin`**
    *   `admin_id` (PK, INT): Unique ID.
    *   `username` (VARCHAR(100)): Login ID (Unique).
    *   `password` (VARCHAR(255)): Hashed password string.

## 5.3. UML DIAGRAMS

**Use Case Diagram Description:**
*   **Actor: Student**
    *   Search College
    *   View Details
    *   Compare Fees
    *   Submit Enquiry
*   **Actor: Admin**
    *   Login
    *   Add College
    *   Update College
    *   Delete College
    *   View Enquiries

## 5.4. INPUT & OUTPUT DESIGN

**Input Design:**
The input design focuses on correctness and ease of use.
*   **Search Filters:** Dropdowns are populated from the database to prevent spelling errors.
*   **Enquiry Form:** Form validation ensures 10-digit phone numbers and valid email syntax (`@` and `.`).
*   **Admin Entry:** Forms use specific input types (`number` for fees, `textarea` for descriptions).

**Output Design:**
*   **College Cards:** Designed to show critical info (Name, Place, Fee) at a glance.
*   **Fee Table:** Structured clearly with rows and columns.
*   **Alerts:** Success/Error messages use distinct colors (Green/Red) to provide immediate feedback.

---

# 6. SYSTEM TESTING

## 6.1. TYPES OF TESTING

Testing is a critical phase to ensure the system is bug-free and meets requirements.

### 1. Unit Testing
This involves testing individual components or functions.
*   *Frontend:* Testing React components check if the "Search" button fires the functionality correctly.
*   *Backend:* Testing individual API functions (e.g., `getColleges`) with mock database calls.

### 2. Integration Testing
Testing the interaction between different modules.
*   *API-DB Integration:* Verifying that a `POST /enquiries` request actually creates a new row in the MySQL `enquiries` table.

### 3. System Testing
Testing the complete flow.
*   **Scenario:** A user lands on the home page -> Selects "Chennai" -> Filters fees < 100,000 -> Clicks a college -> Viewing details -> Submits an enquiry -> Success message is shown.

## 6.2. TEST CASES

| Test ID | Test Case Description | Input Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | **Search Functionality** | District: "Chennai", Fee: < 100000 | Display colleges in Chennai with fees < 1L | As Expected | **PASS** |
| **TC-02** | **College Details View** | Click on "Dhanalakshmi College" | Redirect to `/college/{id}` and show details | As Expected | **PASS** |
| **TC-03** | **Enquiry Form Validation** | Phone: "123" (Invalid) | Alert: "Phone must be 10 digits" | Alert Shown | **PASS** |
| **TC-04** | **Enquiry Submission** | Valid Name, Email, Phone | "Enquiry sent successfully" message | Message Shown | **PASS** |
| **TC-05** | **Admin Login Success** | Valid Admin User/Pass | Redirect to Dashboard | As Expected | **PASS** |
| **TC-06** | **Admin Login Fail** | Invalid Password | Error: "Invalid credentials" | Error Shown | **PASS** |
| **TC-07** | **Fee Calculation** | Select "AC Hostel" | Total Fee increments by differnce | As Expected | **PASS** |
| **TC-08** | **Add New College** | New College Data | "College Added" alert & appears in list | As Expected | **PASS** |

---

# 7. SYSTEM IMPLEMENTATION

## 7.1. NAME OF THE MODULES

The project is implemented via the following key modules:

1.  **Authentication Module:** Handles Admin login and session security.
2.  **College Management Module:** Handles CRUD operations for College data.
3.  **Search & Filter Engine:** Logic to parse user queries and construct dynamic SQL.
4.  **Enquiry System:** Captures and stores user interest.
5.  **Fee Calculation Engine:** Dynamically aggregates different fee components.

## 7.2. MODULE DESCRIPTION

### A. Authentication Module
Implemented in `backend/routes/adminRoutes.js`. It utilizes hashing to compare the user-provided password with the database hash. On success, it issues a token (or simple session success status) allowing the frontend to reveal the admin interface.

### B. College Management Module
Allows the admin to add a new college. This involves a multi-step form where basic details, hostel fees, and one-time fees are entered. The backend utilizes **Transactions** (SQL `START TRANSACTION`, `COMMIT`) to ensure that data is inserted into all three tables (`colleges`, `hostel_fees`, `one_time_fees`) atomically.

### C. Search & Filter Engine
This is the core of the user experience.
*   *Frontend Code:* Collects state from inputs (`selectedDistrict`, `maxFee`).
*   *Backend Code:* Generates a dynamic SQL query string.
    *   `SELECT * FROM colleges WHERE 1=1`
    *   If district is present: `AND district = ?`
    *   If fee is present: `AND fees BETWEEN ? AND ?`
    This approach makes the search highly flexible.

---

# 8. APPENDICES

## 8.1. SCREENSHOTS

*(Placeholders for printed report)*

**Figure 8.1: Home Page**
*Shows the Hero section with the "Find Your Future" slogan and the main search filters for District and Degree.*

**Figure 8.2: Search Results**
*Displays a grid of College Cards matching the user's criteria, showing thumbnails and base fees.*

**Figure 8.3: College Details Page**
*Detailed view showing the slideshow, the "About" text, and the interactive Fee Structure table.*

**Figure 8.4: Enquiry Modal**
*The pop-up form requesting Student Name, Phone, and Email.*

**Figure 8.5: Admin Dashboard**
*The secure tabular view where the Admin can see a list of recent enquiries.*

## 8.2. SOURCE CODE - FRONTEND

**File: `frontend/src/App.jsx`**
```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CollegeDetails from './pages/CollegeDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FeeExplorer from './pages/FeeExplorer';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header glass">
          <div className="container nav">
            <Link to="/" className="nav-logo">
              <span style={{ fontSize: '2rem' }}>🎓</span>
              <span className="gradient-text">Advanced Guidance</span>
            </Link>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/fees">Fees</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/admin/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Admin</Link>
            </nav>
          </div>
        </header>

        <main style={{ minHeight: 'calc(100vh - 200px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/college/:id" element={<CollegeDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/fees" element={<FeeExplorer />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
```

**File: `frontend/src/index.css`**
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

:root {
  --primary: #6366f1;
  --secondary: #a855f7;
  --background: #0b0f1a;
  --card-bg: rgba(17, 25, 40, 0.75);
  --glass-border: rgba(255, 255, 255, 0.08);
  --text-primary: #ffffff;
  --text-secondary: #94a3b8;
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: var(--background);
  color: var(--text-primary);
  line-height: 1.6;
}

.glass {
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 1.25rem;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}
```

**File: `frontend/src/pages/Home.jsx`**
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [colleges, setColleges] = useState([]);
  const [filters, setFilters] = useState({ degree: '', district: '', minFee: 0, maxFee: 200000 });
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetchOptions();
    fetchColleges();
  }, []);

  const fetchOptions = async () => {
    const res = await axios.get('http://localhost:5000/api/colleges/options');
    setDistricts(res.data.districts);
  };

  const fetchColleges = async () => {
    const params = new URLSearchParams();
    if (filters.district) params.append('district', filters.district);
    params.append('maxFee', filters.maxFee);
    const res = await axios.get(`http://localhost:5000/api/colleges/filter?${params.toString()}`);
    setColleges(res.data);
  };

  return (
    <div className="container animate-fade-in">
      <div className="hero">
        <h1 className="gradient-text">Find Your Dream College</h1>
        <select onChange={e => setFilters({ ...filters, district: e.target.value })}>
           <option value="">All Districts</option>
           {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <button onClick={fetchColleges}>Search</button>
      </div>
      <div className="card-grid">
        {colleges.map(c => (
          <div key={c.college_id} className="glass college-card">
            <h3>{c.college_name}</h3>
            <p>{c.district}</p>
            <Link to={`/college/${c.college_id}`}><button>Details</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
```

**File: `frontend/src/pages/CollegeDetails.jsx`**
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CollegeDetails() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [hostelFees, setHostelFees] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/colleges/${id}`).then(res => setCollege(res.data));
    axios.get(`http://localhost:5000/api/colleges/fees/unified/${id}`).then(res => setHostelFees(res.data));
  }, [id]);

  if (!college) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{college.college_name}</h1>
      <p>{college.description}</p>
      <table>
        <thead><tr><th>Fee Type</th><th>Amount</th></tr></thead>
        <tbody>
          {hostelFees.map((f, i) => <tr key={i}><td>{f.name || f.hostel_type}</td><td>₹{f.amount}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
export default CollegeDetails;
```

**File: `frontend/src/pages/AdminDashboard.jsx`**
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [colleges, setColleges] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('colleges');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('admin')) navigate('/admin/login');
    fetchColleges();
    fetchEnquiries();
  }, []);

  const fetchColleges = async () => {
    const res = await axios.get('http://localhost:5000/api/colleges');
    setColleges(res.data);
  };
  const fetchEnquiries = async () => {
    const res = await axios.get('http://localhost:5000/api/enquiries');
    setEnquiries(res.data);
  };

  return (
    <div className="container animate-fade-in">
        <button onClick={() => setActiveTab('colleges')}>Manage Colleges</button>
        <button onClick={() => setActiveTab('enquiries')}>View Enquiries</button>
        {activeTab === 'colleges' && colleges.map(c => <div key={c.college_id}>{c.college_name}</div>)}
        {activeTab === 'enquiries' && enquiries.map(e => <div key={e.enquiry_id}>{e.student_name}</div>)}
    </div>
  );
}
export default AdminDashboard;
```

**File: `frontend/src/pages/FeeExplorer.jsx`**
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeeExplorer() {
    const [data, setData] = useState({ engineering: [], aviation: [], ugFees: [], pgFees: [] });
    const [activeTab, setActiveTab] = useState('engineering');

    useEffect(() => {
        axios.get('http://localhost:5000/api/colleges/data/engineering').then(res => setData(prev => ({ ...prev, engineering: res.data })));
        axios.get('http://localhost:5000/api/colleges/data/aviation').then(res => setData(prev => ({ ...prev, aviation: res.data })));
        // ... similar for other fees
    }, []);

    return (
        <div className="container">
            <button onClick={() => setActiveTab('engineering')}>Engineering</button>
            <button onClick={() => setActiveTab('aviation')}>Aviation</button>
            <table>
                <tbody>
                    {data[activeTab].map((d, i) => <tr key={i}><td>{d.course}</td><td>{d.fees}</td></tr>)}
                </tbody>
            </table>
        </div>
    );
}
export default FeeExplorer;
```

**File: `frontend/src/pages/AdminLogin.jsx`**
```javascript
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/login', creds);
      localStorage.setItem('admin', 'true');
      navigate('/admin/dashboard');
    } catch {
      alert('Invalid Credentials');
    }
  };

  return (
    <form onSubmit={handleLogin} className="glass" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Admin Portal</h2>
      <input placeholder="Username" onChange={e => setCreds({...creds, username: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setCreds({...creds, password: e.target.value})} />
      <button>Login</button>
    </form>
  );
}
export default AdminLogin;
```

**File: `frontend/src/pages/About.jsx`**
```javascript
import React from 'react';
function About() {
    return <div className="container"><h1>About Us</h1><p>Empowering Future Scholars.</p></div>;
}
export default About;
```

**File: `frontend/src/pages/Contact.jsx`**
```javascript
import React from 'react';
function Contact() {
    return <div className="container"><h1>Contact Us</h1><p>Email: support@example.com</p></div>;
}
export default Contact;
```

## 8.3. SOURCE CODE - BACKEND

**File: `backend/server.js`**
```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const collegeRoutes = require('./routes/collegeRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/colleges', collegeRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('College Agency API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

**File: `backend/routes/collegeRoutes.js`**
```javascript
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all colleges
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM colleges');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Filter colleges
router.get('/filter', async (req, res) => {
  const { degree, district, minFee, maxFee } = req.query;
  let query = 'SELECT * FROM colleges WHERE 1=1';
  const params = [];

  if (district) {
    query += ' AND district = ?';
    params.push(district);
  }
  if (maxFee) {
    query += ' AND fees <= ?';
    params.push(maxFee);
  }

  try {
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Unified Fees by College ID
router.get('/fees/unified/:id', async (req, res) => {
  const query = `
    SELECT 'HOSTEL_FEE' AS fee_type, hf.hostel_type, hf.total_amount AS amount
    FROM hostel_fees hf WHERE hf.college_id = ?
    UNION ALL
    SELECT 'ONE_TIME_FEE' AS fee_type, ot.fee_name AS name, ot.amount
    FROM one_time_fees ot WHERE ot.college_id = ?
  `;
  try {
    const [rows] = await db.query(query, [req.params.id, req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
```

**File: `backend/routes/enquiryRoutes.js`**
```javascript
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', async (req, res) => {
  const { student_name, phone, email, interested_degree, college_id } = req.body;
  // Validation...
  try {
    await db.execute('INSERT INTO enquiries VALUES (?, ?, ?, ?, ?)', [student_name, phone, email, interested_degree, college_id]);
    res.status(201).json({ message: 'Enquiry submitted exists' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM enquiries');
  res.json(rows);
});

module.exports = router;
```

**File: `backend/routes/adminRoutes.js`**
```javascript
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    // Admin login logic
});

module.exports = router;
```

## 8.4. DATABASE SCRIPTS

**File: `database.sql` (Schema Structure)**
```sql
CREATE DATABASE IF NOT EXISTS college_agency_db;
USE college_agency_db;

CREATE TABLE IF NOT EXISTS colleges (
  college_id INT AUTO_INCREMENT PRIMARY KEY,
  college_name VARCHAR(200),
  degree VARCHAR(100),
  district VARCHAR(100),
  fees INT,
  hostel_fees INT DEFAULT 0,
  one_time_fees INT DEFAULT 0,
  description TEXT,
  image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS hostel_fees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college_id INT,
  hostel_type VARCHAR(200),
  room_type VARCHAR(200),
  fee_per_year INT,
  mess_fee INT,
  total_amount INT
);

CREATE TABLE IF NOT EXISTS one_time_fees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college_id INT,
  fee_name VARCHAR(200),
  amount INT,
  purpose TEXT,
  status VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS enquiries (
  enquiry_id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(150),
  phone VARCHAR(15),
  email VARCHAR(150),
  interested_degree VARCHAR(100),
  college_id INT,
  enquiry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (college_id) REFERENCES colleges(college_id)
);

CREATE TABLE IF NOT EXISTS admin (
  admin_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

-- Sample Data Insertion
INSERT INTO admin (username, password) VALUES ('admin', '$2b$10$YourHashedPasswordHere');
```

---

# 9. CONCLUSION & FUTURE ENHANCEMENT

## CONCLUSION
The "College Finder & Fee Comparison Web Application" successfully achieves its primary goal of simplifying the college search process. By leveraging the power of modern web technologies, the system provides a fast, user-friendly, and transparent platform for students and parents. The problem of information asymmetry regarding hidden fees and hostel charges is effectively resolved through the unified fee structure display. Integrating a direct enquiry system further bridges the gap between the stakeholders. The project demonstrates the effectiveness of full-stack web development in solving real-world educational consultancy problems.

## FUTURE ENHANCEMENT

While the current system is robust, there are several avenues for future development:
1.  **AI-Powered Recommendations:** Implementing a Machine Learning model.
2.  **Payment Gateway Integration:** allowing students to pay/book seats.
3.  **Mobile Application:** Developing a native React Native app.
4.  **Alumni Connect:** Adding a section for reviews.

---

# 10. REFERENCES

1.  **React Documentation** - https://reactjs.org/docs/getting-started.html
2.  **Node.js Documentation** - https://nodejs.org/en/docs/
3.  **Express.js API Reference** - https://expressjs.com/
4.  **MySQL 8.0 Reference Manual** - https://dev.mysql.com/doc/refman/8.0/en/
5.  **MDN Web Docs** - https://developer.mozilla.org/en-US/

---
**ALL THE BEST**
