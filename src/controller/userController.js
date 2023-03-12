const userModel = require('../model/userModel')
const validator = require('../validator/validator')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    try {
        let data = req.body
        let {Name, phoneNumber, password, age, pincode, aadhar, ...rest} = data

         //------------------------------body validation-------------------------------------------
        if (!validator.checkInput(data)) return res.status(400).send({ status: false, message: "Body cannot be empty, Please provide mandatory fields i.e. Name, phone, password, age, pincode, aadhar" });
        if (validator.checkInput(rest)) return res.status(400).send({ status: false, message: "Provide only Name, phoneNumber, password, age, pincode, aadhar." })

         //------------------------------name validation-------------------------------------------
        if (!validator.isValidInput(Name)) return res.status(400).send({status: false, message: "Please Enter Name"})
        if (!validator.checkName(Name)) return res.status(400).send({status: false, message: "Name should be alphabet only"})
        data.Name = validator.checkName(Name)
         //------------------------------phoneNumber validation-------------------------------------------

        if (!validator.isValidInput(phoneNumber)) return res.status(400).send({status: false, message: "Please Enter phoneNumber"})
        if (!validator.isValidMobileNumber(phoneNumber)) return res.status(400).send({status: false, message: "INVALID INPUT... Please provide a valid phone Number"})
         
         //------------------------------password validation-------------------------------------------

        if (!validator.isValidInput(password)) return res.status(400).send({status: false, message: "Please Enter Password"})
        if (!validator.isValidpassword(password)) return res.status(400).send({status: false, message: "Invalid Password Format. password should be have minimum 8 character and max 15 character and must contains one number, one uppar alphabet, one lower alphabet and one special character"})

        //------------------------------age validation-------------------------------------------
        if (typeof age == 'number'){
            if (age > 120 || age < 5) return res.status(400).send({status: false, message: "To register here age must be more than 5 and less than 120"})
        }else{
            return res.status(400).send({status: false, message: "Age should be only in number"})}
        
            //------------------------------pincode validation-------------------------------------------
        if (typeof pincode == 'number'){
            if (!validator.isValidPin(pincode)) return res.status(400).send({status: false, message: "INVALID INPUT... please provide a valid pincode"})
        }else{
            return res.status(400).send({status: false, message: "Pincode should be only in number"})}

            //------------------------------aadhar validation-------------------------------------------
        if (!validator.isValidInput(aadhar)) return res.status(400).send({status: false, message: "Please enter aadhar"})
        if (!validator.isValidAadhar(aadhar)) return res.status(400).send({status: false, message: "INVALID INPUT... please enter a valid aadhar Number"})
              
        // ---------------------------------- checking unique phoneNumber and aadharNumber---------------
        let isDuplicate = await userModel.findOne({$or: [{phoneNumber: phoneNumber}, {aadhar: aadhar}]})
        if (isDuplicate){
            if (isDuplicate.phoneNumber==phoneNumber) return res.status(409).send({status: false, message: `Given phoneNumber: ${phoneNumber} already exist`})
            if (isDuplicate.aadhar==aadhar) return res.status(409).send({status: false, message: `Given aadhar: ${aadhar} already exist`})}

        //----------------------------------------create User data---------------------------------------
        let userData = await userModel.create(data)
        return res.status(201).send({status: true, message: "user Created successfully", data: userData})
        
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }}

         //------------------------------logIn User-------------------------------------------

exports.loginUser = async (req, res) => {
    try {
        let data = req.body
        let {phoneNumber, password, ...rest} = data
        
        //------------------------------body validation-------------------------------------------
        if (!validator.checkInput(data)) return res.status(400).send({ status: false, message: "Please provide phoneNumber and password to login" });
        if (validator.checkInput(rest)) return res.status(400).send({ status: false, message: "this field accepts only phoneNumber and password" }) 

        //------------------------------phoneNumber validation-------------------------------------------
        if (!validator.isValidInput(phoneNumber)) return res.status(400).send({ status: false, message: "Please enter phoneNumber" })
        if (!validator.isValidMobileNumber(phoneNumber)) return res.status(400).send({ status: false, message: "INVALID INPUT... please provide a valid phoneNumber" })

        //------------------------------password validation-------------------------------------------
        if (!validator.isValidInput(password)) return res.status(400).send({ status: false, message: "Please enter password" })
        if (!validator.isValidpassword(password)) return res.status(400).send({status: false, message: "Invalid Password Format. password should be have minimum 8 character and max 15 character and must contains one number, one uppar alphabet, one lower alphabet and one special character"})

        //------------------------------checking unique phonenumber and password-------------------------------------------
        let checkUser = await userModel.findOne({phoneNumber: phoneNumber, password: password}).select({__v:0})
        if (!checkUser) return res.status(400).send({ status: false, message: "Incorrect phoneNumber or Password"})

        //------------------------------creating token-------------------------------------------
        let token = jwt.sign({Id : checkUser._id, category: 'User'}, 'shhh', {expiresIn: '1h'})
        if (!token) return res.status(400).send({ status: false, message: "something went wrong"})
        res.setHeader('token',token)

        let obj = {token: "Token has been sent in Header", UserDetails: checkUser}
        return res.status(200).send({status: true, message: "login successfull", data: obj})


    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }}

    exports.getVc


