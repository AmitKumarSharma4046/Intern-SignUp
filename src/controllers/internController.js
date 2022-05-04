const internModel = require('../models/internModel');
const collegeModel = require('../models/collegeModel');

const createInter = async function (req, res) {
    
    try {

        const internData = req.body;
        const { name, mobile, email, collegeName } = internData;

        if (!name) {
            return res.status(400).send({ status: false, msg: "Please enter Full Name its a required field!" });
        }

        if (!email) {
            return res.status(400).send({ status: false, msg: "Please enter Email its a required field!" });
        }

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, msg: "Please enter a valid email address" })
        }

        const isPresentEmail = await internModel.findOne({ email: email });
        if (isPresentEmail) {
            return res.status(409).send({ status: false, msg: "Email address already exists" });
        }

        if (!mobile) {
            return res.status(400).send({ status: false, msg: "Please enter Mobile Number its a required field!" });
        }

        if (`${mobile}`.length < 10 || `${mobile}`.length > 10) {
            return res.status(400).send({ status: false, msg: "Please enter a valid Mobile Number" })
        }

        const isPresentMoblie = await internModel.findOne({ mobile: mobile });
        if (isPresentMoblie) {
            return res.status(409).send({ status: false, msg: "Mobile Number already exists" });
        }

        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "Please College Name its a required field!" });
        }

        if (collegeName) {
            
            const foundedCollege = await collegeModel.findOne({ name: collegeName });
            if (!foundedCollege){
                return res.status(404).send({ status: false, msg: "College Not Found" });  
            }

            internData.collegeId = foundedCollege._id;
            const internCreated = await internModel.create(internData);
            return res.status(201).send({ status: true, data: internCreated });

        }
                    
        }catch (err) {
    res.status(500).send({ status: false, msg: err.message })
 }

}


module.exports.createInter = createInter;