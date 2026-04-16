let users = [];

function isValid(username) {
    return users.some(user => user.username === username);
}

function authenticatedUser(username, password) {
    return users.some(user => user.username === username && user.password === password);
}

module.exports = {
    users,
    isValid,
    authenticatedUser
};