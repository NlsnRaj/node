const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/upload/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
const upload = multer({
  storage: storage
});

const users = require("../controllers/userController");

const plans = require("../controllers/plansController");

const user = require("../controllers/commonController");

//CRUD users

//testing
router.get("/testing", (res, req) => {
  res.send("Router working fine");
});

//Read
router.get("/users", users.getUserData);

//Create
router.post("/user", users.postUserData);

//update
// router.put('/user',users.putData);

//delete
// router.delete('/user',users.deleteData);


//CRUD plan

//Read
router.get("/plans", plans.getPlanData);
//Create
router.post("/plan", plans.postPlanData);



// Common api
router.post("/api/user", user.createUser);
router.put("/api/:_id/userupdate", user.updateUser);
router.get("/api/:_id/users", user.getUser);
router.post("/api/uploaduser", upload.single('singleFile'), user.postBulkData);

module.exports = router;