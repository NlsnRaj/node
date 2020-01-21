const mongoose = require("mongoose");
const users = mongoose.Schema({
  name: {
    type: String
  },
  mobile: {
    type: String
  },
  email: {
    type: String
  },
  stb_no: {
    type: String
  },
  plan_id: {
    type: String
  }
});
module.exports = mongoose.model("Users", users);
