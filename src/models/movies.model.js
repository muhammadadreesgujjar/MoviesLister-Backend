const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    imgURL: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        required: true
    },
    username: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie