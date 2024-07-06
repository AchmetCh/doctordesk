const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema({ 
    name: {
        type: String,
        require: true
    },
    surname:{
        type: String,
        require: true
    },
    SSN: {
        type: Number,
        required: true,
        unique:true
    },
    symptoms:{
        type: String
    },
    allergies:{
        type: String
    },
    medications: {
        type: String
    },
    diseasehistory:{
        type: String
    },
    other: {
        type: String
    },
    diagnosis: {
        type: String
    }
 });


 const Patient = mongoose.model('Patient', patientSchema)
 module.exports = {Patient};