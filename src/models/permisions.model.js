const mongoose = require("mongoose");

const permisionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}
);

const Permision = mongoose.model("Permision", permisionSchema);

module.exports = Permision;
