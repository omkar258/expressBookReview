const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const books = require('./booksdb');
const { users, isValid, authenticatedUser } = require('./users');

const app = express();
app.use(bodyParser.json());

const SECRET = "fingerprint";

// Get all books
app.get('/', (req, res) => {
    res.json({ books });
});

// Get by ISBN
app.get('/isbn/:isbn', (req, res) => {
    res.json(books[req.params.isbn]);
});

// Get by Author
app.get('/author/:author', (req, res) => {
    const result = Object.values(books).filter(
        book => book.author.toLowerCase() === req.params.author.toLowerCase()
    );
    res.json(result);
});

// Get by Title
app.get('/title/:title', (req, res) => {
    const result = Object.values(books).filter(
        book => book.title.toLowerCase() === req.params.title.toLowerCase()
    );
    res.json(result);
});

// Get reviews
app.get('/review/:isbn', (req, res) => {
    res.json(books[req.params.isbn].reviews);
});

// Register
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (isValid(username)) {
        return res.json({ message: "User already exists" });
    }

    users.push({ username, password });
    res.json({ message: "User successfully registered. Now you can login" });
});

// Login
app.post('/customer/login', (req, res) => {
    const { username, password } = req.body;

    if (authenticatedUser(username, password)) {
        return res.json({ message: "Login successful" });
    }

    res.status(401).json({ message: "Invalid credentials" });
});

// Add/Modify review
app.put('/customer/auth/review/:isbn', (req, res) => {
    const { username, review } = req.body;

    books[req.params.isbn].reviews[username] = review;

    res.json({
        message: "Review added/updated",
        reviews: books[req.params.isbn].reviews
    });
});

// Delete review
app.delete('/customer/auth/review/:isbn', (req, res) => {
    const { username } = req.body;

    delete books[req.params.isbn].reviews[username];

    res.json({ message: "Review successfully deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});