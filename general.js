const axios = require('axios');

// Get all books
async function getAllBooks() {
    try {
        const res = await axios.get('http://localhost:5000/');
        return res.data;
    } catch (error) {
        return { error: "Unable to fetch books. Please try again later." };
    }
}

// Get by ISBN
async function getByISBN(isbn) {
    try {
        const res = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        return res.data;
    } catch (error) {
        return { error: `No book found with ISBN ${isbn}. Please check and try again.` };
    }
}

// Get by Author
async function getByAuthor(author) {
    try {
        const res = await axios.get(`http://localhost:5000/author/${author}`);
        return res.data;
    } catch (error) {
        return { error: `No books found for author "${author}".` };
    }
}

// Get by Title
async function getByTitle(title) {
    try {
        const res = await axios.get(`http://localhost:5000/title/${title}`);
        return res.data;
    } catch (error) {
        return { error: `No book found with title "${title}".` };
    }
}

module.exports = {
    getAllBooks,
    getByISBN,
    getByAuthor,
    getByTitle
};