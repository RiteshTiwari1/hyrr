const { User, PasswordReset } = require("../db");
const { use } = require("./user");
const bcrypt = require("bcrypt");

const mailVerification = async(req,res) =>{
    try{
        if(req.query.id==undefined){
            return res.render('404');
        }

        const userData = await User.findOne({_id:req.query.id});
        

        if(userData.is_verified===true){
            return res.render('mail-verification',{message:'Your Mail already Verified'})
        }
        if(userData){
            await User.findByIdAndUpdate({_id:req.query.id},{
                $set:{
                    is_verified:true
                }
            })
            return res.render('mail-verification',{message:'Mail has been Verified Successfully'})
        }else{
            return res.render('mail-verification',{message:'User Not Found'})
        }
    }
    catch(err){
        console.log(err);
        return res.render('404')
    }   
}

const resetPassword = async(req,res)=>{
    try{
        if(req.query.token == undefined)
        return res.render('404');

        const resetData = await PasswordReset.findOne({token:req.query.token});

        if(!resetData){
            return res.render('404');
        }

        return res.render('reset-password',{resetData})
    }
    catch(err){
        return res.render('404');
    }
}

const updatePassword = async(req,res)=>{
    try{
        // console.log("helloo");
        const {user_id , password, confirmPassword} = req.body;

        const resetData = await PasswordReset.findOne({user_id});
        console.log(user_id,password,confirmPassword);
        console.log(resetData);

        if(password!=confirmPassword){
            console.log("helloooo")
            return res.render('reset-password',{resetData , error:'Confirm Password Not Matching'});
        }       
        // console.log("Bye");
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);
        await User.findByIdAndUpdate({_id:user_id},{
            $set:{
                password:hashedPassword
            }
        })

        await PasswordReset.deleteMany({user_id});
        
        return res.redirect('/reset-success');
    }
    catch(err){
        return res.render('404');
    }
}

const resetSuccess = (req,res)=>{
    try{
        
        return res.render('reset-success');
    }
    catch(err){
        return res.render('404');
    }
}

module.exports = {
    mailVerification,
    resetPassword,
    updatePassword,
    resetSuccess
    
};
