const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = require('./User');

const companySchema = new Schema({
    name: String,
    employees: [UserSchema]
});

mongoose.model("companies", companySchema);