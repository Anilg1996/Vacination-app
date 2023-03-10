const timeSlotModel = require('../model/timeSlotModel')
const validator = require('../validator/validator')

exports.createVaccineSlot = async (req, res) => {
    try {
        let data = req.body
        let {date, vaccineCenter, totalVaccineAvailable, timeSlots, pincode, ...rest} = data
           //--------------------body validation----------------------------------------
        if (!validator.checkInput(data)) return res.status(400).send({ status: false, message: "Body cannot be empty, please provide mandatory fields, i.e. date, totalVaccineAvailable, timeSlots, pincode, vaccineCenter" });
        if (validator.checkInput(rest)) return res.status(400).send({ status: false, message: "this field accepts only date, totalVaccineAvailable, timeSlots, pincode" }) 
            //--------------------date validation----------------------------------------

        if (!validator.isValidInput(date)) return res.status(400).send({status: false, message: "Please Enter Date"})
        if (!validator.isValidDate(date)) return res.status(400).send({ status: false, message: "Date should be in YYYY-MM-DD format" })
            //--------------------pincode validation----------------------------------------

        if (typeof pincode != 'number') return res.status(400).send({status: false, message: "pincode must be Number"})
        if (!validator.isValidPin(pincode)) return res.status(400).send({status: false, message: "INVALID INPUT... please provide a valid pincode"})
            //--------------------vaccineCenter validation----------------------------------------

        if (!validator.isValidInput(vaccineCenter)) return res.status(400).send({status: false, message: "Please enter vaccineCenter"})
        if (!validator.isValidCity(vaccineCenter)) return res.status(400).send({status: false, message: "Please provide a valid city"})
             //--------------------totalVaccineAvailable validation----------------------------------------

        if (typeof totalVaccineAvailable != 'number') return res.status(400).send({status: false, message: "This field accepts only Number"})
        if (!validator.isValidNum(totalVaccineAvailable)) return res.status(400).send({status: false, message: "Please enter a valid number"})

        //-------------------------create vaccine slot-------------------------------------------
        let vaccineData = await timeSlotModel.create(data)

        return res.status(201).send({status: true, message: "successful", data: vaccineData})


    } catch (error) {
        if (error._message=="Timeslot validation failed") {
            return res.status(400).send({ status: false, message: error.message })
        }else{
            return res.status(500).send({ status: false, message: error.message })
        }}}

