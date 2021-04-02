require('dotenv').config()
const db = require("../db/models")
const User = db.users
const Story = db.stories
const ReadList = db.readinglists
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Post Request
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
                res.status(201).send(user)
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.postmarks = async (req, res) => {
    const { id } = req.body

    try {
        const user = await User.findOne({where: { id: id}})
        const story = await Story.findOne({where: {id: '36a15c49-038d-4027-8ad2-48d4b912ff38'}})

        if (user && story) {
            const userId = user.dataValues.id
            const storyId = story.dataValues.id
            ReadList.create({
                userId: userId,
                storyId: storyId
            }).then(readinglist => {
                res.status(201).send(readinglist)
            }).catch((error) => {
                console.error(error);
              });
        }
    } catch {
        res.status(500).send()
    }
}

exports.publish = async (req, res) => {
    const { title, body } = req.body

    try {
        Story.create({
            title: title,
            body: body,
            image: 'http://placeimg.com/640/480',
        }).then(story => {
            res.status(201).send(story)
        }).catch(
            res.status(500).send()
        )
    } catch {
        res.status(500).send()
    }
}

//Get request

exports.stories = async (req, res) => {
    const stories = await Story.findAll();
    try {
        res.status(200).json({stories})
    } catch{
        res.status(500).send()
    }
}

exports.getmarks = async (req, res) => {
    const userId = '764ad933-b1bd-42a3-b791-e1f65d85a78c';
    const getmarks = await ReadList.findAll({
        where: {
            userId: userId,
        }
    });

    try {
        if (getmarks) {
            console.log(getmarks)
            res.status(200).json({getmarks})
        }
    } catch {
        res.status(500).send()
    }
}

exports.getall = async (req, res) => {
    const sup = await Story.findAll();
    try {
        res.status(200).json({sup})
    } catch{
        res.status(500).send()
    }
}
