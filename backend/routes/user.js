// backend/routes/user.js
const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, PasswordReset} = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");
const mailer = require('../helper/mailer');
const randomstring = require('randomstring');


const signupBody = zod.object({
    username: zod.string(),
	email: zod.string().email(),
	password: zod.string(),
    confirmPassword:zod.string()
})

router.post("/signup", async (req, res) => {

    // console.log(req.body);
    const { success } = signupBody.safeParse(req.body);
    // console.log(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(411).json({
            message: "Password and confirm password do not match"
        });
    }

    const existingUser = await User.findOne({
        email: req.body.email
    })
    // console.log(existingUser);
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log(hashedPassword);
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })

    const msg = `<p>Hii, ${req.body.username}, Please <a href="http://localhost:${process.env.PORT || 3000}/mail-verification?id=${user._id}">Verify</a> your mail.</p>`;
    mailer.sendMail(req.body.email, 'Mail Verification', msg);

    const userId = user._id;

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET,{
        expiresIn:"1d"
    });

    res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = zod.object({
    email: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {

    // console.log(req.body);
    const { success } = signinBody.safeParse(req.body)
    // console.log(success);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        email: req.body.email,
    });

    if (user) {
        
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET,{
                expiresIn:"1d"
            });

            return res.json({
                token: token
            });
            
        }else{
            return res.status(411).json({
                message: "Password Incorrect"
            })
        }
    }
    console.log(user);
    
    res.status(411).json({
        message: "Email Id not found"
    })
})

const forgetPasswordBody = zod.object({
    email: zod.string().email()
})

router.post('/forgot-password',authMiddleware, async(req,res)=>{

    
    try{
    const { success } = forgetPasswordBody.safeParse(req.body)
    // console.log(success);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        email: req.body.email,
    });
    console.log(user);
    if(!user){
        return res.status(400).json({
            msg:"Email doesn't exist"
        })
    }

        const randomString = randomstring.generate();
        const msg = '<p>Hii, ' + user.username + ', Please click <a href="http://127.0.0.1:3000/reset-password?token=' + randomString + '">here</a> to reset your password.</p>';
        await PasswordReset.deleteMany({user_id:user._id})
        const passwordReset = new PasswordReset({
            user_id:user._id,
            token:randomString
        });

        await passwordReset.save();

        mailer.sendMail(user.email,'Reset Password',msg);
        return res.status(201).json({
            success:true,
            msg:'Reset Password Link send to your mail, Please'
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})
router.get("/",authMiddleware, async(req,res) =>{
    const existingUser = await User.findOne({
        _id: req.userId
    })
    console.log(existingUser);
    if (existingUser) {
        return res.status(200).json({
            existingUser,
        })
    }
    else{
        return res.status(411).json({
            message: "Error while finding user information"
        })
    }
})


module.exports = router;

