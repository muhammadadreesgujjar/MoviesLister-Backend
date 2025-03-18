const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const path = require('path');
const port = process.env.PORT || 4000;
const connectDB = require('../src/config/db')
const authRouter = require('../src/routes/auth.route');
const moviesRouter = require('../src/routes/movies.route');
const userPermisionsRouter = require('../src/routes/userPermisions.route');

app.use(cors());
app.use(express.static(path.join(__dirname, '/src/public')))
app.use(express.json());
app.get('/',(req,res)=>res.send("Movie List Api is working ...."));
app.use('/auth', authRouter);
app.use('/movies', moviesRouter);
app.use('/permision', userPermisionsRouter);

app.listen(port, async () => {
    await connectDB();
    console.log(`Project is runnig on http://localhost:${port}`)
})
