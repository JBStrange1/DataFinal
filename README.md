# CS495 Final Project – E-Commerce Website

## Overview
This is a simple e-commerce web application developed for **CS495 – Special Topics in Database Systems**.  
The application demonstrates a full-stack design with a strong focus on relational database modeling and data management.

---

## Features
- Browse products by category  
- Search products by name  
- Admin page with reporting and additional features  
- Client-side cart functionality that logs orders upon checkout  

---

## Tech Stack
- **Frontend:** HTML, CSS, Bootstrap, JavaScript  
- **Backend:** Node.js, Express  
- **Database:** MySQL  

---

## Database Design
- Products  
- Flies, Equipment, Materials (subtables of Products)  
- Customers  
- Orders  
- OrderItems  

### Key Considerations
- Each product exists in the `Products` table, with subtype tables storing category-specific data  
- Each customer can have multiple orders  
- Each order can contain multiple order items  

---

## Setup Instructions

### 1. Initialize the Database
Run the schema script in MySQL Workbench (or your preferred client):

```bash
initialization.sql
```

### 2. Load Test Data
Run the test data script:

```bash
testdata.sql
```
### 3. Change dbconfig to match your credentials
```bash
    module.exports = {
        host: 'localhost',
        user: 'YOUR_USERNAME',
        password: 'YOUR_PASSWORD',
        database: 'YOUR_DBNAME'
    };
```
### 4. Install Dependencies
Make sure Node.js and npm are installed, then run:

```bash
npm install
```

### 5. Start the Application
In one terminal run the command:
```bash
npm run server
```
To start the API server then in another terminal run the command:
```bash
npm run dev
```
---

## Usage
Once the application is running, you can browse products, add items to your cart, and simulate placing orders through the interface.

---

## Notes
- The database design follows normalization principles to reduce redundancy  
- Subtype tables allow flexible storage of category-specific attributes  
- The system is structured to be easily extendable  

---

## Author
John Strange  
Northern Michigan University – Computer Science  