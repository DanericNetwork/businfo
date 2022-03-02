const mongoose = require("mongoose");
const ritSchema = new mongoose.Schema({
    id: { type: Number },
    busnum: { type: Number },
    curbs: { type: Number },
    delay: { type: Number },
    skips: { type: Number },
    from: { type: String },
    to: { type: String },
    date: { type: Date },
});
module.exports = mongoose.model("rit", ritSchema);