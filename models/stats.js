const mongoose = require("mongoose");
const busSchema = new mongoose.Schema({
    id: { type: String },

    curb: { type: Number },

    delay: { type: Number },

    skips: { type: Number },
});
module.exports = mongoose.model("stats", busSchema);