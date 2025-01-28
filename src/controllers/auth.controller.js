const UserPermission = require("../models/userPermissions.model");
const User = require("../models/auth.model");
const Role = require("../models/roles.model");
const GenerateToken = require('../utils/jwtHelper');

const signUpController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required."
            });
        }

        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(422).json({
                status: "error",
                message: "User Already exist with this email",
            })
        }

        const addRole = await Role.findOne({ name: 'user' });
        if (!addRole) return console.log("User role not found ");
        let userInstance = new User({
            username: username,
            email: email,
            password: password,
            role: addRole._id
        });
        const response = await userInstance.save({ timestamps: { createdAt: true, updatedAt: true } });
        const mainPermision = new UserPermission({
            userId: response._id
        });
        await mainPermision.save();
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

        const response = await User.findOne({ email: email }).populate('role');
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

        const token = GenerateToken(email);
        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Error while signIn",
            })
        }

        return res.status(200).json({
            status: "success",
            message: "SignIn SuccessFull",
            data: {
                token: token,
                role: response.role.name
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error while signIn",
        })
    }
}

module.exports = { signUpController, signInController };
