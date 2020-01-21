const planModel = require("../models/plans");

const planObj = {};

planObj.getPlanData = (req, res) => {

  planModel.find((err, data) => {

    if (err)
      res.send({
        status: false,
        msg: "failed to get data"
      });
    else
      res.send({
        status: true,
        msg: data,
      });
  });
};
planObj.postPlanData = (req, res) => {
  let newPlan = new planModel({
    plan_name: req.body.plan_name,
    plan_amount: req.body.plan_amount
  });
  newPlan.save((err, data) => {
    if (err)
      res.send({
        status: false,
        msg: "failed to insert data"
      });
    else
      res.send({
        status: true,
        msg: data
      });
  });
};

module.exports = planObj;