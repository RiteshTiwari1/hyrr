const express=require("express");

const router= express();

router.use(express.json());


const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const { mailVerification, resetPassword, updatePassword, resetSuccess } = require('./userController'); 


console.log(mailVerification);
router.get('/mail-verification', mailVerification)
router.get('/reset-password',resetPassword)
router.post('/reset-password',updatePassword)
router.get('/reset-success', resetSuccess)
module.exports = router;