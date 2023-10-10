import express from "express";
const adminRouter = express.Router();
import { authAdmin, logout, getAllUser, deleteUser , } from "../controllers/adminController.js";

adminRouter.post('/login',authAdmin)
adminRouter.post('/logout',logout)
adminRouter.get('/getUser',getAllUser)
adminRouter.post('/deleteUser',deleteUser)
// adminRouter.get('/search', searchUsers);


export default adminRouter;