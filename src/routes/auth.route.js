const express = require('express');
const { signUpController, signInController } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.get('/', (req, res) => { res.send("App and  Router is working fine ...."); });
authRouter.post('/sign-up', signUpController);
authRouter.post('/sign-in', signInController);

module.exports = authRouter;
