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
        var obj = {}
        for (var i = 0; i < csvData.length; i++) {
          obj['name'] = csvData[i].name,
            obj['mobile'] = csvData[i].mobile,
            obj['email'] = csvData[i].email,
            obj['stb_no'] = csvData[i].stb_no,
            planModel.findOne({
              plan_name: csvData[i].plan_name
            }, (err, data) => {
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
  
