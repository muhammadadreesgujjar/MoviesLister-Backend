const express = require('express');
const upload = require('../middlewares/multer');
const { getMoviesController, newMovieController, updateMovieController, findMovieController, deleteMovieController } = require('../controllers/movies.controller');
const verifyToken = require('../middlewares/jwt');

const moviesRouter = express.Router();

moviesRouter.get('/all-movies', verifyToken, getMoviesController);
moviesRouter.get('/find-movie', verifyToken, upload.single('file'), findMovieController);
moviesRouter.post('/new-movie', verifyToken, upload.single('file'), newMovieController);
moviesRouter.post('/update-movie', verifyToken, upload.single('file'), updateMovieController);
moviesRouter.delete('/delete-movie', verifyToken, deleteMovieController);

module.exports = moviesRouter;
