const express=require("express");

const router= express();

router.use(express.json());
const mailVerification = require('./userController')

console.log("hello masds sadsaldmsad asdasdlsamd msadsadamsk");
console.log(mailVerification);
router.get('/mail-verification', mailVerification)

module.exports = router;