const mongoose = require("mongoose");
const busSchema = new mongoose.Schema({
    id: { type: String },

    stoeprand: { type: Number },

    vertraging: { type: Number },
});
module.exports = mongoose.model("stats", busSchema);