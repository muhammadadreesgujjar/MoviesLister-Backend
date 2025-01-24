const mongoose = require("mongoose");
const Permision = require('../models/permisions.model');
const connectDB = require('../config/db');
require('dotenv').config()

const seedData = async () => {
    try {
        await connectDB();
        await Permision.deleteMany({});
        console.log("Deleted Successfully");
        await Permision.insertMany([
            { name: 'view' },
            { name: 'create' },
            { name: 'update' },
            { name: 'delete' }
        ]);
        console.log("Added Successfully");
    } catch (error) {
        console.log("Error while adding : ", error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed.');
    }
}

seedData();
