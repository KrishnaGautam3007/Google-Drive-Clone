const express = require('express')
const router= express.Router()
const{ body,validationResult} = require('express-validator');
const Usermodel = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
router.get('/',(req,res)=>{
    res.render('home')
})
router.get('/register',(req,res)=>{
    res.render('register')
})
router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:5 }),
    body('username').trim().isLength({min:3}),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
            errors: errors.array(),
            message: 'Invalid data'
           })
        }
        const {email,password,username} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser= await Usermodel.create({
            email,
            username,
            password: hashedPassword
        })
        res.redirect('/user/login')
    })
    router.get('/login',(req,res) => {
        res.render('login')
    })
    router.post('/login',
        body('username').trim().isLength({min:3 }),
        body('password').trim().isLength({min:5 }),
        async (req, res) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid data'
                    })
                    }
            const {username,password} = req.body;
            const user = await Usermodel.findOne({
                        username:username
                    });
            if(!user){
                    return res.status(400).json({
                        message: 'Invalid username or password'
                    })
                    }
            const isValidPassword = await bcrypt.compare(password,user.password);
            if(!isValidPassword){
                return res.status(400).json({
                    message: 'Invalid username or password'
                    })
                    }
            const token = jwt.sign({
                UserId: user._id,
                username: user.username,
                email: user.email

            },
            process.env.JWT_SECRET,
            )
            res.cookie('token',token)
            res.redirect('/upload')
            })
module.exports = router;