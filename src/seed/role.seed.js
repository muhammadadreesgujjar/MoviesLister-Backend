const mongoose = require("mongoose");
const Role = require('../models/roles.model');
const connectDB = require('../config/db');
require('dotenv').config()

const seedData = async () => {
    try {
        await connectDB();
        await Role.deleteMany({});
        console.log("Deleted Successfully");
        await Role.insertMany([
            { name: 'admin' },
            { name: 'user' }
        ]);
        console.log("Added Successfully");
    } catch (error) {
        console.log("Error while fecthing : ", error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed.');
    }
}

seedData();
