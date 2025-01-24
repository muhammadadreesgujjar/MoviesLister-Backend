const Movie = require('../models/movies.model');
const uploadToCloudinary = require('../middlewares/cloudnary');

const getMoviesController = async (req, res) => {
    try {
        const response = await Movie.find().populate('userName');
        return res.status(200).json({
            status: "success",
            message: "Get SuccessFully",
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error while fecthing...",
        })
    }
}

const newMovieController = async (req, res) => {
    try {
        const { name, publishYear } = req.body;
        let imgURL = null;
        if (!name || !publishYear) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required."
            });
        }

        const file = req.file;
        if (file) {
            const result = await uploadToCloudinary(file.path, file.filename);
            if (!result.url) {
                return res.status(200).json({
                    status: "error",
                    message: "Error while uploading Image",
                })
            }
            imgURL = result.url;
        }

        let movieInstance = new Movie({
            imgURL: imgURL,
            name: name,
            publishYear: publishYear
        });
        const response = await movieInstance.save({ timestamps: { createdAt: true, updatedAt: true } });

        return res.status(200).json({
            status: "success",
            message: "Save SuccessFully",
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error while saving...",
        })
    }
}

module.exports = { getMoviesController, newMovieController };