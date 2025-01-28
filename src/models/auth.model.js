const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: { type: mongoose.SchemaTypes.ObjectId, ref: 'Role' }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}
);

authSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        next();
    }
});

authSchema.methods.comparePassword = async function (password) {
    try {
        const isValid = await bcrypt.compare(password, this.password);
        return isValid;
    } catch (error) {
        throw new Error("Error comparing passwords");
    }
}

const User = mongoose.model("User", authSchema);

module.exports = User
