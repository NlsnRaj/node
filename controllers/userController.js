const usersModel = require("../models/user");

const customerObj = {};

customerObj.getUserData = (req, res) => {
  usersModel.findById(
  (err, value) => {
    if (err)
      res.send({
        status: false,
        msg: "failed to get data"
      });
    else
      res.send({
        status: true,
        msg: value
      });
  });
};

customerObj.postUserData = (req, res) => {
  let newUsers = new usersModel({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    stb_no: req.body.stb_no,
    plan_id: req.body.plan_id
  });
  newUsers.save((err, value) => {
    if (err)
      res.send({
        status: false,
        msg: "failed to insert data"
      });
    else
      res.send({
        status: true,
        msg: value
      });
  });
};

module.exports = customerObj;
