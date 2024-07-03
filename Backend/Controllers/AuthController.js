const Doctor = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


exports.register = async (req,res) => {
    const {username, passowrd} = req.body
    try {
        const user = await Doctor.findOne({username})
        if(user) return res.status(400).json({msg: 'User already exists'})
            const password = await bcrypt.hash(passowrd, SALT_ROUNDS)
        const newUser = new Doctor({username, password})
        await newUser.save()
        res.json({msg: 'User registered successfully'})
        } catch (error) {
            console.log(error)
            }
            }
            exports.login = async (req,res) => {
                const {username, password} = req.body
                try {
                    const user = await Doctor.findOne({username})
                    if(!user) return res.status(400).json({msg: 'User does not exist'})
                        const isMatch = await bcrypt.compare(password, user.password)
                    if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'})
                        const payload = {user: {id: user.id}}
                    const token = jwt.sign(payload, PRIVATE_KEY, {expiresIn: 360000})
                    res.status(200).send({token, user:{id:user._id}})
                    } catch (error) {
                        console.log(error)
                        res.status(500).send({message:'Unable to login'})
                        }
}
