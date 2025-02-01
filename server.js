const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// Database setup
const db = new sqlite3.Database('./database.db');

// Create tables for books and cart
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            author TEXT,
            image TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            book_id INTEGER,
            FOREIGN KEY (book_id) REFERENCES books(id)
        )
    `);
});
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            author TEXT,
            image TEXT,
            price REAL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            book_id INTEGER,
            FOREIGN KEY (book_id) REFERENCES books(id)
        )
    `);
    

    // Add sample books with prices
    const books = [
        { title: 'Book 1', author: 'Author 1', image: 'https://via.placeholder.com/150', price: 19.99 },
        { title: 'Book 2', author: 'Author 2', image: 'https://via.placeholder.com/150', price: 24.99 },
        { title: 'Book 3', author: 'Author 3', image: 'https://via.placeholder.com/150', price: 14.99 },
    ];

    const insertBook = db.prepare('INSERT INTO books (title, author, image, price) VALUES (?, ?, ?, ?)');
    books.forEach(book => {
        insertBook.run(book.title, book.author, book.image, book.price);
    });
    insertBook.finalize();
});

// Add sample books to the database
db.serialize(() => {
    const books = [
        { title: 'Book 1', author: 'Haruki Murakami', image: 'https://i.pinimg.com/736x/20/77/71/207771cffffd3412d4f043c41fcd431d.jpg' },
        { title: 'Book 2', author: 'Haruki Murakami', image: 'https://i.pinimg.com/736x/ee/a3/27/eea327cbda9089a2d4ba05119cd9c6d0.jpg' },
        { title: 'Book 3', author: 'Yann Martel', image: 'https://i.pinimg.com/736x/81/a7/fa/81a7fa0d123774b1e5896ffac60ba760.jpg' },
    ];

    const insertBook = db.prepare('INSERT INTO books (title, author, image) VALUES (?, ?, ?)');
    books.forEach(book => {
        insertBook.run(book.title, book.author, book.image);
    });
    insertBook.finalize();
});

// API to search books
app.get('/api/books', (req, res) => {
    const searchQuery = req.query.q;
    const query = `
        SELECT * FROM books
        WHERE title LIKE ? OR author LIKE ?
    `;
    db.all(query, [`%${searchQuery}%`, `%${searchQuery}%`], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API to add a book to the cart
app.post('/api/cart', (req, res) => {
    const { bookId } = req.body;
    db.run('INSERT INTO cart (book_id) VALUES (?)', [bookId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Book added to cart', cartId: this.lastID });
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});