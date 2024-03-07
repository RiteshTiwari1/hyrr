const { User } = require("../db");

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


module.exports = mailVerification;
