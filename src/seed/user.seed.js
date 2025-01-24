const mongoose = require("mongoose");
const User = require('../models/auth.model');
const Role = require('../models/roles.model');
const connectDB = require('../config/db');
require('dotenv').config()

const seedData = async () => {
    try {
        await connectDB();
        const findUsers = await User.find().populate('role');
        const findAdmin = findUsers.find(item => item.role.name == 'admin');
        if (findAdmin) return console.log("Admin already Exist : ", findAdmin);
        const addRole = await Role.findOne({ name: 'admin' });
        await addRole.save({ timestamps: { createdAt: true, updatedAt: true } });
        const createAdmin = new User({
            userName: 'admin',
            email: 'admin@gmail.com',
            password: 'admin123',
            role: addRole._id
        });
        await createAdmin.save({ timestamps: { createdAt: true, updatedAt: true } });
        console.log("Added Successfully");
    } catch (error) {
        console.log("Error while fecthing : ", error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed.');
    }
}

seedData();
