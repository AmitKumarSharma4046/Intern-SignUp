const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const isValid = function (value) {
    if (typeof value === "undefined" || typeof value === null) return false
    if (typeof value === "string" && value.trim().length == 0) return false
    return true
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidURL = function (str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

const postCollege = async function (req, res) {
    try {
        const requestBody = req.body
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Invalid request parameters.Please provide college details" })
        }
        if (!isValid(requestBody.name)) {
            return res.status(400).send({ status: false, msg: "Please provide college name" })
        }
        if (!isValid(requestBody.fullName)) {
            return res.status(400).send({ status: false, msg: "Please provide college fullName" })
        }
        if (!isValid(requestBody.logoLink)) {
            return res.status(400).send({ status: false, msg: "Please provide college logoLink" })
        }
        if (!isValidURL(requestBody.logoLink)) {
            return res.status(400).send({ status: false, msg: "Please provide a valid college logoLink" })
        }

        const collegeAlreadyExist = await collegeModel.findOne({ name: requestBody.name })
        if (collegeAlreadyExist) return res.status(400).send({ status: false, msg: "college already exists." })

        const newCollege = await collegeModel.create(requestBody)
        res.status(201).send({ status: true, msg: "College Successfully Created", data: newCollege })

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const getCollegeDetails =  async function (req, res){
    try{
        let requestQuery = req.query
        if(!isValidRequestBody(requestQuery)){
            return res.status(400).send({status:false, msg:"Provide a query collegeName"})
        }
        if(Object.keys(requestQuery).length>1)return res.status(400).send({status:false, msg:"Invalid Request.Single query collegeName is available"})
        let collegeName = requestQuery.collegeName
        
        let collegeFromQueryData = await collegeModel.findOne({name:collegeName})
        
        if(Object.keys(collegeFromQueryData).length===0)return res.status(404).send({status:false,msg:"College details not found"}) 
        
        let collegeFromQueryDataId = collegeFromQueryData._id.toString()

        let internForQueryCollege = await internModel.find({collegeId:collegeFromQueryDataId})
        if(Object.keys(internForQueryCollege).length===0)return res.status(404).send({status:false,msg:`Intern details not found for ${collegeName} `})
        
        
        let resultData={}
        resultData["name"]=collegeFromQueryData.name
        resultData["fullName"]=collegeFromQueryData.fullName
        resultData["logoLink"]=collegeFromQueryData.logoLink
        resultData["interest"]=internForQueryCollege

        res.status(200).send({status:true,data:resultData}) 

    }
    catch(error){
        res.status(500).send({status:false, msg: error.message})
    }
}

module.exports.postCollege = postCollege
module.exports.getCollegeDetails = getCollegeDetails