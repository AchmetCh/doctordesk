const {Patient} = require('../Models/Patient')

exports.showAllPatient = async(req, res) => {
    try {
        const patients = await Patient.find()
        res.status(200).json(patients)
        } catch (error) {
            res.status(500).json(error)
            }
}

exports.createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body)
        res.status(201).json(patient)
        } catch (error) {
            res.status(500).json(error)
            }
}

exports.searchPatient = async (req, res) => {
    try {
        const SSN = req.params.ssn;
        const patient = await Patient.findOne({ SSN });

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePatient = async(req, res) => {
    try {
        const SSN = req.params.ssn
        console.log(`patient SSN ${SSN}`);
        const patient = await Patient.findOneAndUpdate({ SSN }, req.body, { new: true })
        if (!patient) return res.status(404).json({ message: "Patient not found"})
            res.status(200).json(patient)
            } catch (error) {
                res.status(500).json({ message: error.message })
                }
}

exports.deletePatient = async (req,res) => {
    try {
        const SSN = req.params.ssn
        const patient = await Patient.findOneAndDelete({ SSN })
        if (!patient) return res.status(404).send({ message: "Patient not found"})
            res.status(200).send('Patient deleted successfully', patient)
        } catch (error) {
            res.status(500).json({ message: error.message })
            }
}