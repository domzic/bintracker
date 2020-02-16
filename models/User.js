const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompanySchema = require('./Company');

const userSchema = new Schema({
    googleId: String,
    displayName: String,
    email: String,
    company: CompanySchema,
    isAdmin: {
        type: Boolean,
        default: false
    },
    confirmed: { 
        type: Boolean, 
        default: false 
    }
});

mongoose.model("users", userSchema);