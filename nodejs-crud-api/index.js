const express = require('express');
const app = express();
const users = require('./routes/users');
const con = require('./db/connection');


// Middlewares
app.use(express.json());

// Routes
app.use('/api/user', users);

app.listen(3000, () => {
    console.log("Application is running on port 3000...");
});