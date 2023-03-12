const express = require('express');
const router = express.Router()
const {registerUser, loginUser} = require('../controller/userController')
const {loginAdmin, getUserList} = require('../controller/adminController')
const {createVaccineSlot} = require('../controller/timeSlotController')
const middleware = require('../middleware/auth')

router.get('/test', function(req, res) {
    return res.status(200).send({status: true, message: 'API is working fine'})
})


router.post('/register', registerUser)

router.post('/login/user', loginUser)

router.post('/login/admin' , loginAdmin)

router.get('/user-list',middleware.Authentication, getUserList)

router.post('/vaccine', createVaccineSlot)


router.all("/**", (req, res)=>{
    return res.status(400).send({status:false, message:"your URL is wrong plese check endpoint"})
})

module.exports=router