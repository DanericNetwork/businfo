const mongoose = require("mongoose");
const shortSchema = new mongoose.Schema({
    id: { type: String },

    stoeprand: { type: Number },

    vertraging: { type: Number },
});
module.exports = mongoose.model("stats", shortSchema);