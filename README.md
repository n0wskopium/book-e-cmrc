# FictionReads: Online Bookstore

FictionReads is an online bookstore web application that allows users to browse, add, and purchase books. The site dynamically loads book data from a MySQL database and stores customer orders in a MongoDB database. It is built with modern web technologies to provide a seamless and responsive user experience.
### main page->
![image](https://github.com/user-attachments/assets/ccf0c301-29e6-422f-bc3b-98f6ddcf63fd)
### add to cart page->
![image](https://github.com/user-attachments/assets/1592fd61-c729-4aa1-bb58-f1bf4b77b3ba)
### checkout page with mongo-db integration->
![image](https://github.com/user-attachments/assets/1aac5a01-1d9e-4119-9e6d-c7449dc371d6)
### data added confirmation(in mongoDb)->
![image](https://github.com/user-attachments/assets/bb692445-59c9-4c49-905c-7a88daaeb45b)
### mysql for book details->
![image](https://github.com/user-attachments/assets/e0462296-bf56-459f-9b81-26bab3fd8627)




## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

FictionReads is designed to offer a user-friendly online bookstore experience. Users can:
- **Browse Books:** The homepage loads the latest and featured books dynamically from a MySQL database.
- **Manage Cart:** Add books to the cart, view the cart contents, remove items, and see the total price.
- **Checkout:** Fill in a checkout form to place orders, which are stored in a MongoDB database.
- **Contact & Team Information:** View a contact page with an integrated team section, highlighting the contributors behind the project.

This project was developed collaboratively by:
- **Abhinav Chauhan** (Project Lead & Developer)
- **Aarjav Jain** (Frontend Developer)
- **Shruti Joshi** (Backend Developer)
- **Abhilakshya Bhatt** (Database & API Specialist)

## Features

- **Dynamic Book Catalog:** Book details (title, author, price, cover URL) are stored in a MySQL database and loaded dynamically.
- **Cart Functionality:** Users can add books to a cart (stored in localStorage), view their cart, and remove items.
- **Order Processing:** A checkout page collects user details and submits orders to MongoDB.
- **Responsive Design:** The website is designed for both desktop and mobile devices.
- **Team Contact Page:** An elegant contact page with a sleek "Our Team" section to introduce project contributors.

# Project Structure
![image](https://github.com/user-attachments/assets/ff113f04-3688-4cc2-aea6-06a2cabf3a98)


## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript, Google Fonts (Poppins)
- **Backend:** Node.js, Express.js
- **Databases:** MongoDB (for orders) and MySQL (for book information)
- **Other Dependencies:** dotenv, cors, mongoose, mysql2

## Prerequisites

Before you begin, make sure you have the following installed on your system:
- [Node.js and npm](https://nodejs.org/) (for running the backend server)
- [MySQL Server](https://www.mysql.com/downloads/) (for storing book data)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB installation (for storing orders)

## Installation and Setup

Follow these steps to clone and set up the project on your local machine:

### 1. Clone the Repository

```sh
git clone https://github.com/n0wskopium/book-e-cmrc.git fictionreads
cd fictionreads
2. Install Backend Dependencies

Navigate to the backend folder and install the required Node.js modules:

cd backend
npm install

3. Set Up Environment Variables

Create a .env file in the backend folder with the following content (update the values with your actual credentials):

# MongoDB (for orders)
MONGO_URI=mongodb+srv://yourMongoUser:yourMongoPassword@yourCluster.mongodb.net/bookstore?retryWrites=true&w=majority

# MySQL (for books)
DB_HOST=localhost
DB_USER=your_user_name
DB_PASS=your_mysql_password
DB_NAME=bookstore

# Port for the backend server
PORT=5000

4. Set Up the MySQL Database

Log in to MySQL (via command-line, MySQL Workbench, or phpMyAdmin) and execute the following:

CREATE DATABASE bookstore;
USE bookstore;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    cover_url VARCHAR(500) NOT NULL,
    featured BOOLEAN DEFAULT 0
);

You can insert sample data using:

INSERT INTO books (title, author, price, cover_url, featured)
VALUES 
('Harry Potter', 'J.K. Rowling', 15.99, 'https://example.com/harry-potter-cover.jpg', 0),
('The Lord of the Rings', 'J.R.R. Tolkien', 22.50, 'https://example.com/lotr-cover.jpg', 1),
('1984', 'George Orwell', 10.99, 'https://example.com/1984-cover.jpg', 0);
etc(These just examples add accordingly).
5. Start the Backend Server

From the backend folder, run:

node server.js

You should see messages indicating that:

    The server is running on port 5000.
    MongoDB is connected.
    MySQL is connected (a test query may also show a success message).

6. Open the Frontend

You can now open the HTML files directly in your browser:

    Open index.html to view the homepage.
    Alternatively, run a local static server (e.g., using Python):

cd ..
npx serve .

Then visit the URL provided (typically http://localhost:3000/index.html).
Running the Application

    Backend: Ensure your Node.js server is running so the API endpoints (for orders and books) are active.
    Frontend: Open index.html, cart.html, checkout.html, or contact.html in your browser. The site will dynamically fetch and display book data and handle cart functionality using localStorage.

How It Works

    Dynamic Book Loading:
    The homepage (index.html) uses JavaScript to fetch book data from the backend API endpoints (/api/books/latest and /api/books/featured) and renders the book cards on the page. The book information is stored in a MySQL database, and each book record includes a cover URL, title, author, and price.

    Cart Functionality:
    When a user clicks "Add to Cart" on a book card, the book details are stored in localStorage. The cart page (cart.html) reads from localStorage, displays the selected books with their prices, and allows items to be removed. The total price is calculated dynamically.

    Checkout Process:
    The checkout page (checkout.html) contains a form for users to enter their details. On submission, the order (including cart items) is sent to the backend and stored in MongoDB. The cart is then cleared, and the user is redirected to the homepage.

    Contact & Team Info:
    The contact page (contact.html) includes a sleek contact form and an "Our Team" section that introduces the project contributors.

Contributing

Contributions are welcome! If you would like to contribute:

    Fork the repository.
    Create a new branch for your feature or bug fix.
    Commit your changes and push your branch.
    Open a pull request explaining your changes.

License

This project is licensed under the MIT License. See the LICENSE file for more information.
Contact

For any questions or feedback, please contact:

    Abhinav Chauhan: abinavchauhanac2005@gmail.com
    Aarjav Jain: aarjavjain2210@gmail.com
    Shruti Joshi: shrutijoshi194@gmail.com
    Abhilakshya Bhatt: abhi.0006272outlook.com

Thank you for checking out FictionReads! Enjoy browsing and happy reading!
This README.md file is thorough and should help someone with little background get started with your project. Let me know if you need any further modifications!
