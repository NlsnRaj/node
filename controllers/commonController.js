const planModel = require("../models/plans");

var usersModel = require("../models/user");

var csvtojson = require("csvtojson");

const commonObj = {};

//getdata from planmodel & and post a new user in usermodel
commonObj.createUser = (req, res) => {
  planModel.findOne({
      plan_name: req.body.plan_name
    },
    (err, data) => {
      console.log(data);
      let newUSer = new usersModel({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        stb_no: req.body.stb_no,
        plan_id: data._id
      });
      newUSer.save((err, data) => {
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
    }
  );
};

//update data
commonObj.updateUser = (req, res) => {
  planModel.findOne({
      plan_name: req.body.plan_name
    },
    (err, data) => {
      let newobj = {};
      if (req.body.name != null) {
        newobj.name = req.body.name;
      }
      if (req.body.mobile != null) {
        newobj.mobile = req.body.mobile;
      }
      if (req.body.email != null) {
        newobj.email = req.body.email;
      }
      if (req.body.stb_no != null) {
        newobj.stb_no = req.body.stb_no;
      }
      if (req.body.plan_name != null) {
        newobj.plan_id = data._id;
      }
      usersModel.findByIdAndUpdate({
          _id: req.params._id
        }, {
          $set: newobj
        },
        (err, data) => {
          res.send(data);
        }
      );
    }
  );
};

//getdata
commonObj.getUser = (req, res) => {
  usersModel.findById({
      _id: req.params._id
    },
    (err, data) => {
      planModel.findById({
          _id: data.plan_id
        },
        (err, value) => {
          let obj = {
            _id: data._id,
            name: data.name,
            mobile: data.mobile,
            email: data.email,
            stb_no: data.stb_no,
            plan: value
          }
          res.send(obj);
        }
      );
    }
  );
};

//bulk upload
commonObj.postBulkData = (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({
      "status": "failed",
      "code": "400",
      "message": "Please upload file"
    });
  } else {
    csvtojson().fromFile(req.file.path).then(csvData => {
      let obj = {}
      for (let i = 0; i < csvData.length; i++) {
        obj['name'] = csvData[i].name,
          obj['mobile'] = csvData[i].mobile,
          obj['email'] = csvData[i].email,
          obj['stb_no'] = csvData[i].stb_no,
          planModel.findOne({
            plan_name: csvData[i].plan_name
          }, (err, data) => {
            // console.log(data)
            obj['plan_id'] = data._id
            var newUser = new usersModel(
              obj
            );
            newUser.save()
          })
      }
      res.status(200).json({
        "status": "success",
        "code": "200",
        "message": "file uploaded successfully"
      });
    });
  }
};

module.exports = commonObj;