const axios = require('axios');

// Get all books
async function getAllBooks() {
    try {
        const res = await axios.get('http://localhost:5000/');
        return res.data;
    } catch (error) {
        return { error: "Error fetching all books" };
    }
}

// Get by ISBN
async function getByISBN(isbn) {
    try {
        const res = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        return res.data;
    } catch (error) {
        return { error: "Invalid ISBN" };
    }
}

// Get by Author
async function getByAuthor(author) {
    try {
        const res = await axios.get(`http://localhost:5000/author/${author}`);
        return res.data;
    } catch (error) {
        return { error: "Author not found" };
    }
}

// Get by Title
async function getByTitle(title) {
    try {
        const res = await axios.get(`http://localhost:5000/title/${title}`);
        return res.data;
    } catch (error) {
        return { error: "Title not found" };
    }
}

module.exports = {
    getAllBooks,
    getByISBN,
    getByAuthor,
    getByTitle
};