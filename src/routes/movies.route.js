const express = require('express');
const upload = require('../middlewares/multer');
const { getMoviesController, newMovieController } = require('../controllers/movies.controller');

const moviesRouter = express.Router();

moviesRouter.get('/movies', getMoviesController);
moviesRouter.post('/new-movie', upload.single('file'), newMovieController);

module.exports = moviesRouter;
