// backend/routes/user.js
const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User} = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");

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


    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })

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
        // Compare the provided password with the hashed password in the database
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



// const updateBody = zod.object({
// 	username: zod.string().optional(),
//     email: zod.string().optional(),
//     password: zod.string().optional(),
// })

// router.put("/", authMiddleware, async (req, res) => {
//     const { success } = updateBody.safeParse(req.body)
//     if (!success) {
//         res.status(411).json({
//             message: "Error while updating information"
//         })
//     }
//     console.log(req.body);
//     const result = await User.updateOne(
//         { _id: req.userId },
//         { $set: req.body }
//     );
//     console.log(req.userId);
//     console.log(result);
//     if (result.modifiedCount > 0) {
//         console.log(`User ${req.userId} updated successfully`);
//         return res.json({
//             message: "Updated successfully"
//         });
//     } else {
//         return res.status(404).json({
//             message: "User not found or no changes made"
//         });
//     }
// })

// router.delete("/delete",authMiddleware,(req,res)=>{
    
// })

// router.get("/bulk", async (req, res) => {
//     const filter = req.query.filter || "";

//     const users = await User.find({
//         $or: [{
//             firstName: {
//                 "$regex": filter
//             }
//         }, {
//             lastName: {
//                 "$regex": filter
//             }
//         }]
//     })

//     res.json({
//         user: users.map(user => ({
//             username: user.username,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             _id: user._id
//         }))
//     })
// })

module.exports = router;