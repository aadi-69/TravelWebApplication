const express = require('express');
const app = express();
const port = 3000;

// In-memory data store (replace this with a real database in a production environment)
const users = [
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
];

const friendships = [];

app.get('/', (req, res) => {
    // Display a list of users and the option to send friend requests
    res.send(`
        <h1>Users</h1>
        <ul>
            ${users.map(user => `
                <li>${user.username}
                    <a href="/send_request/${user.id}">Send Friend Request</a>
                </li>
            `).join('')}
        </ul>
    `);
});

app.get('/send_request/:senderId', (req, res) => {
    const senderId = parseInt(req.params.senderId, 10);
    const receiverId = 1; // Replace with the actual receiver's ID (e.g., from a form)

    // Create a friend request
    friendships.push({ senderId, receiverId, status: 'pending' });

    res.send('Friend request sent!');
});

app.get('/accept_request/:requestId', (req, res) => {
    const requestId = parseInt(req.params.requestId, 10);

    // Accept a friend request
    const friendship = friendships.find(f => f.id === requestId);
    if (friendship) {
        friendship.status = 'accepted';
        res.send('Friend request accepted!');
    } else {
        res.send('Friend request not found.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});