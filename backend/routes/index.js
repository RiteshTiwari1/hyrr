// backend/user/index.js


const express = require('express');
const userRouter = require("./user");

const postRouter = require("./post");

const authRouter = require("./auth")

const router = express.Router();

router.use("/user", userRouter);
router.use("/post",postRouter);
router.use("/auth",authRouter);

module.exports = router;