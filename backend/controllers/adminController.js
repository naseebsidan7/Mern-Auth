import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Admin from '../models/adminModel.js'
import generateToken from "../utils/generateToken.js";


const authAdmin = expressAsyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const admin = await Admin.findOne({email})

    if(admin && (await admin.matchPassword(password))){
        generateToken(res,admin._id);

        res.status(201).json({
            _id:admin._id,
            name:"admin",
            email:admin.email
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or Passsword')
    }
})

const logout = expressAsyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'User Logout'})
})

const getAllUser = expressAsyncHandler(async(req,res)=>{
    try {
        const userData = await User.find({},{name:1,email:1})
        if(userData){
            res.status(200).json({userData})
        }else{
            res.status(401)
            throw new Error('Fetch Failed')
        }
    } catch (error) {
        console.log(error.message);
    }
})

const deleteUser = expressAsyncHandler(async(req,res)=>{
    try {
        let userId = req.body.id;
        let userRemoved = await User.deleteOne({_id:userId})

        if(userRemoved){
            res.status(200).json({userRemoved})
        }else{
            res.status(401)
            throw new Error('Failed to Detelte User ')
        }
    } catch (error) {
        console.log(error.message);
    }
})

// const searchUsers = expressAsyncHandler(async(req,res)=>{
//           try {
//             const {query} = req.query;

//           const searchUserRes = await User.find({
//                    $or:[
//                     { name:{$regex:query,$options:'i'}},
//                     { email:{$regex:query,$options:'i'}}
//                    ]
//           },{name:1,email:1});

//           if(searchUserRes.length > 0 ){
//             res.status(200).json({searchUserRes})
//           }else{
//             res.status(404).json({message:'No Matching Users Found'})
//           }

//           } catch (error) {
//             console.log(error.message);
//             res.status(500).json({ message:'Server Error' })
//           }
// })

export {
    authAdmin,
    logout,
    getAllUser,
    deleteUser,
    // searchUsers
}