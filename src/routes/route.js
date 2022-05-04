const express = require('express');
const router = express.Router();

const collegeController = require('../controllers/collegeController')
const internController = require('../controllers/internController')




router.post("/functionup/colleges", collegeController.postCollege)


router.get("/functionup/collegeDetails", collegeController.getCollegeDetails)





router.post("/functionup/interns", internController.createInter)


// if api is invalid OR wrong URL
router.all("/**", function (req, res) {
    res.status(404).send({status: false,msg: "The api you request is not available" })
})


module.exports = router;