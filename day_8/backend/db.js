const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb://localhost:27017/project_1")

module.exports = connection;
