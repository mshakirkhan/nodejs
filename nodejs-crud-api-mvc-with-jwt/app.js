const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');

// Middilewares
app.use(express.json());
app.use("/api/users", userRouter);

app.listen(3000, () => {
    console.log("Port is running on port 3000");
})