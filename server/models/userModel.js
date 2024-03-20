const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: "String",
        required: [true, "Please add the user name"],
    },
    age: {
        type: "Number",
        required: [true, "Please add the user age"],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);