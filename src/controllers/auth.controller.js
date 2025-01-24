const User = require("../models/auth.model");
const Role = require("../models/roles.model");

const signUpController = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required."
            });
        }
        let roleInstance = new Role({});
        const roleResponse = await roleInstance.save({ timestamps: { createdAt: true, updatedAt: true } });

        let userInstance = new User({
            userName: userName,
            email: email,
            password: password,
            role: roleResponse._id
        });
        const response = await userInstance.save({ timestamps: { createdAt: true, updatedAt: true } });

        return res.status(200).json({
            status: "success",
            message: "SignUp SuccessFull",
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error while saving",
        })
    }
}

const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required."
            });
        }

        const response = await User.findOne({ email: email });
        if (!response) {
            return res.status(401).json({
                status: "error",
                message: "User not found",
            })
        }

        const isPasswordValid = await response.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: "error",
                message: "Password not match",
            })
        }

        return res.status(200).json({
            status: "success",
            message: "SignIn SuccessFull",
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error while saving",
        })
    }
}

module.exports = { signUpController, signInController };
