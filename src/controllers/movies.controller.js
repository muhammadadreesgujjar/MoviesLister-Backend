const Movie = require('../models/movies.model');
const User = require('../models/auth.model');

const getMoviesController = async (req, res) => {
    try {
        const email = req.email;
        const response = await Movie.aggregate(
            [
                [
                    {
                        $lookup: {
                            from: "users",
                            localField: "username",
                            foreignField: "_id",
                            as: "username"
                        }
                    },
                    {
                        $unwind: "$username"
                    },
                    {
                        $match: {
                            "username.email": email
                        }
                    },
                    {
                        $project: {
                            imgURL: 1,
                            name: 1,
                            publishYear: 1
                        }
                    }
                ]
            ]
        )

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
        const email = req.email;
        const { name, publishYear } = req.body;
        if (!name || !publishYear) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required."
            });
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({
                status: "error",
                message: "Image is required."
            });
        }
        const user = await User.findOne({ email: email })
        let movieInstance = new Movie({
            imgURL: `/images/${file.filename}` || null,
            name: name,
            publishYear: publishYear,
            username: user._id
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

const updateMovieController = async (req, res) => {
    try {
        const movieId = req.query.id;
        const email = req.email;
        const { name, publishYear } = req.body;
        if (!movieId || !name || !publishYear) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required."
            });
        }

        const file = req.file;
        if (!file) {
            const response = await Movie.findByIdAndUpdate({ _id: movieId }, {
                name: name,
                publishYear: publishYear,
            });
            return res.status(200).json({
                status: "success",
                message: "Update SuccessFully",
                data: response
            })
        }
        const response = await Movie.findByIdAndUpdate({ _id: movieId }, {
            imgURL: `/images/${file.filename}` || null,
            name: name,
            publishYear: publishYear,
        });
        // let movieInstance = new Movie({
        //     imgURL: `/images/${file.filename}` || null,
        //     name: name,
        //     publishYear: publishYear,
        //     username: user._id
        // });
        // const response = await movieInstance.save({ timestamps: { createdAt: true, updatedAt: true } });
        return res.status(200).json({
            status: "success",
            message: "Update SuccessFully",
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error while saving...",
        })
    }
}

const findMovieController = async (req, res) => {
    try {
        const email = req.email;
        const movieId = req.query.id;
        if (!movieId) {
            return res.status(400).json({
                status: "error",
                message: "Id required."
            });
        }

        const movie = await Movie.findOne({ _id: movieId });
        if (!movie) {
            return res.status(400).json({
                status: "error",
                message: "Id is invalid."
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Find SuccessFully",
            data: movie
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error while saving...",
        })
    }
}

const deleteMovieController = async (req, res) => {
    try {
        const movieId = req.query.id;
        if (!movieId) {
            return res.status(400).json({
                status: "error",
                message: "Id required."
            });
        }

        const movie = await Movie.findByIdAndDelete({ _id: movieId });
        return res.status(200).json({
            status: "success",
            message: "Find SuccessFully",
            data: movie
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error while deleting...",
        })
    }
}

module.exports = { getMoviesController, newMovieController, updateMovieController, findMovieController, deleteMovieController };
