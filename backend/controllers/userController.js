import expressAsyncHandler from "express-async-handler"
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";



// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public

const authUser = expressAsyncHandler(async(req,res)=>{
     const {email,password} =  req.body
     const user = await User.findOne({ email })

     if(user && (await user.matchPassword(password)) ){

        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        });

     }else{
           res.status(401);
           throw new Error('Invalid Email or Password')
     } 
});


// @desc    Register a new User
// route    POST /api/users/register
// @access  Public

const registerUser = expressAsyncHandler(async(req,res)=>{
    

    const {name,email,password} = req.body
    
    const userExist  =  await User.findOne({email})
    if(userExist){
        res.status(404) 
        throw new  Error('User Already Exists')
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        console.log("qwerty");
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
 
});

  
// @desc    Logout User
// route    POST /api/users/logout
// @access  Public 

const logoutUser = expressAsyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'User Logged Out'})
});



// @desc    Get User Profile
// route    GEt /api/users/profile
// @access  Private

const getUserProfile = expressAsyncHandler(async(req,res)=>{
    console.log(req.user);
    const user = {
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email,   
    }
    res.status(200).json(user)
});


// @desc    Update user Profile 
// route    POST /api/users/profile 
// @access  Private

    const updateUserProfile  = expressAsyncHandler(async(req,res)=>{
        
        const user = await User.findById(req.user._id);
        if(user){

            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            console.log(req.file +"req file =========================");
            if (req.file) {
             
                user.profile = req.file.buffer; 
            }
        
            if(req.body.password){
                user.password = req.body.password;
            }
            const updatedData = await user.save();
            res.status(200).json({
                _id: updatedData._id,
                name: updatedData.name,
                email: updatedData.email,
            
            })  

        }else{
            res.status(404)
            throw new Error('User not Found ')
        }
        res.status(200).json({message:'Update User Profile'})
    })


export {
    authUser,
    registerUser,
    logoutUser, 
    getUserProfile,
    updateUserProfile
};