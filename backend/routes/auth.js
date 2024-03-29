const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser'); 

const JWT_SECRET = "Yogiismyname@123";

// ROUTE 1: Create a User using: POST "/api/auth/createuser". Doesn't require auth

router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3}),
    body('email', ).isEmail(),
    body('password').isLength({ min: 8}),
] , async(req, res) => {
    let success = false;
    //  If there are errors, return Bad request and the errors 
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(404).json({success, errors: errors.array() });
    }
    // Check weather the user with this email exists already

    try{
        let user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(400).json({error : "Sorry a user with this email already exits"})
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt)
        // Create a New User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user:{
                id:user.id
            }
        }
         
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log({authtoken});

        // res.json(user)
        success = true;
        res.json({success, authtoken})

    } catch(error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    } 
})

// ROUTE 2: Authenticate a user using : POST "/api/auth/login"

router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
] , async(req, res) => {

     //  If there are errors, return Bad request and the errors 

     console.log(req.body);
     const errors = validationResult(req);
     if(!errors.isEmpty()) {
         return res.status(404).json({ errors: errors.array() });
     }

     const {email, password} = req.body;
     try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error: "Please try to login with correct Credentials"});
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                success = false;
                return res.status(400).json({success, error: "Please try to login with correct Credentials"});
            }
            
            const data = {
                user:{
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken })

     } catch (error) {

        console.error(error.message);
        res.status(500).json("Internal server Error")
     }
})

// ROUTE 2:  : Get loggedin User Details using : POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser , async(req, res) => {

try {
    userid = req.user.id;
    const user = await User.findById(userid).select("-password")
    res.send(user);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})

module.exports = router
