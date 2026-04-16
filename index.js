const express = require('express');
const bodyParser = require('body-parser');

const books = require('./booksdb');
const { users, isValid, authenticatedUser } = require('./users');

const app = express();
app.use(bodyParser.json());

// Get all books
app.get('/', (req, res) => {
    res.json({ books });
});

// Get by ISBN
app.get('/isbn/:isbn', (req, res) => {
    const book = books[req.params.isbn];
    if (book) return res.json(book);
    return res.status(404).json({ message: "Book not found" });
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
    const book = books[req.params.isbn];
    if (book) return res.json(book.reviews);
    return res.status(404).json({ message: "Book not found" });
});

// Register
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ message: "Username and password required" });
    }

    if (isValid(username)) {
        return res.json({ message: "User already exists" });
    }

    users.push({ username, password });

    res.json({
        message: "User successfully registered. Now you can login"
    });
});

// Login (FINAL FIXED)
app.post('/customer/login', (req, res) => {
    const { username, password } = req.body;

    if (authenticatedUser(username, password)) {
        return res.json({
            message: "Login successful",
            user: username
        });
    }

    return res.status(401).json({
        message: "Invalid username or password"
    });
});

// Add/Modify review
app.put('/customer/auth/review/:isbn', (req, res) => {
    const { username, review } = req.body;

    if (!books[req.params.isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    books[req.params.isbn].reviews[username] = review;

    res.json({
        message: "Review added/updated",
        reviews: books[req.params.isbn].reviews
    });
});

// Delete review
app.delete('/customer/auth/review/:isbn', (req, res) => {
    const { username } = req.body;

    if (!books[req.params.isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    delete books[req.params.isbn].reviews[username];

    res.json({
        message: "Review successfully deleted"
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});