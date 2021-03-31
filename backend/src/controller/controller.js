require('dotenv').config()
const db = require("../db/models")
const User = db.users
const Story = db.stories
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        let emailCheck = await User.findOne({where: {email: req.body.email}})
        if (emailCheck) { 
            res.json({msg: 'This user already exists', error: true})
        }
        else {
            User.create({
                name,
                email,
                password: await bcrypt.hash(password, 10)
            }).then(user => {
                const token = jwt.sign(user.name, process.env.ACCESS_TOKEN_SECRET)
                res.send(user)
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.stories = async (req, res) => {
    const stories = await Story.findAll();
    try {
        res.json({stories})
    } catch{
        res.status(500).send()
    }
}

exports.getall = async (req, res) => {
    const sup = await Story.findAll();
    try {
        res.json({sup})
    } catch{
        res.status(500).send()
    }
}
