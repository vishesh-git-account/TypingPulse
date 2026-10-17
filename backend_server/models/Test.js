const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    wpm : {type: Number, required: true},
    cpm : {type: Number, required: true},
    accuracy: {type: Number, required: true},
    errors: {type: Number, required: true},
    time: {type: Number, required: true},
    difficulty: {type: String, default: "medium"},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Test",testSchema);