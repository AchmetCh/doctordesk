const Patient = require('../Models/Patient')

exports.showAllPatient = async(req, res) => {
    try {
        const patients = await Patient.find()
        res.status(200).json(patients)
        } catch (error) {
            res.status(500).json(error)
            }
}

exports.searchPatient = async(req, res) => {
    try {
        const {ssn} = req.params
        const patient = await Patient.findOne({ ssn })
        if (!patient) return res.status(404).json({ message: "Patient not found"})
            res.status(200).json(patient)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
}

exports.updatePatient = async(req, res) => {
    try {
        const {ssn} = req.params
        const patient = await Patient.findOneAndUpdate({ ssn }, req.body, { new: true })
        if (!patient) return res.status(404).json({ message: "Patient not found"})
            res.status(200).json(patient)
            } catch (error) {
                res.status(500).json({ message: error.message })
                }
}

exports.deletePatient = async (req,res) => {
    try {
        const {ssn} = req.params
        const patient = await Patient.findOneAndDelete({ ssn })
        if (!patient) return res.status(404).send({ message: "Patient not found"})
            res.status(200).json(patient)
        } catch (error) {
            res.status(500).json({ message: error.message })
            }
}