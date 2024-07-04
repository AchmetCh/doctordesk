const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema({ 
    name: {
        type: String
    },
    surname:{
        type: String
    },
    SSN: {
        type: Number,
        required: true
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
    disease_history:{
        type: String
    },
    other: {
        type: String
    }
 });


 const Patient = mongoose.model('Patient', patientSchema)
 module.exports = {Patient};