const mongoose = require("mongoose");
const settingsSchema = new mongoose.Schema({
    id: { type: String, default: 'data' },
    admins: { type: Array },
});
module.exports = mongoose.model("settings", settingsSchema);