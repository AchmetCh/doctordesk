const express = require('express')
const router = express.Router()
const {showAllPatient, searchPatient, updatePatient, deletePatient, createPatient} = require('../Controllers/Controllers')
const {register, login,} = require('../Controllers/AuthController')

router.post('/register', register)
router.post('/login', login)
router.post('/create', createPatient)
router.get('/patient', showAllPatient)
router.get('/search/:ssn', searchPatient)
router.put('/update/:ssn', updatePatient)
router.delete('/delete/:ssn', deletePatient)

module.exports = router