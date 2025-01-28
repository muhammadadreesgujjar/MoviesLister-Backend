const express = require('express');
const { getAdminPermisions, getUserPermisions, updateUserPermisions } = require('../controllers/userPermisions.controller');
const userPermisionsRouter = express.Router();
const verifyToken = require('../middlewares/jwt');

userPermisionsRouter.get('/admin-permisions', verifyToken, getAdminPermisions);
userPermisionsRouter.get('/user-permisions', verifyToken, getUserPermisions);
userPermisionsRouter.post('/update-user-permisions', verifyToken, updateUserPermisions);

module.exports = userPermisionsRouter;
