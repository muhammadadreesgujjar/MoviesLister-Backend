const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 4000;
const connectDB = require('./src/config/db')
const authRouter = require('./src/routes/auth.route');
const moviesRouter = require('./src/routes/movies.route');

app.use(express.json())
app.use(authRouter);
app.use(moviesRouter);

app.listen(port, () => {
    connectDB();
    console.log(`Project is runnig on  http://localhost:${port}`)
})
