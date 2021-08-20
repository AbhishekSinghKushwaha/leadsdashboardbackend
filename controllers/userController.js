const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
var router = express.Router();

const {User} = require('../models/user');

/////////// SIGNIN ///////////
router.post('/signin', async(req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exists."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials."})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test');

        res.status(200).json({ result: existingUser, token});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong."});
    }
})

/////////// SIGNUP ///////////
router.post('/signup', async(req, res) => {
    const { name, email, password, confirmpassword} = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exists."});

        if(password !== confirmpassword) return res.status(400).json({ message: "Password don't match."});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ name, email, password: hashedPassword});

        const token = jwt.sign({ email: result.email, id: result._id}, 'test');

        res.status(200).json({ result, token});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong."});
    }
})

module.exports = router;