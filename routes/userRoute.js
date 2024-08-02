import express from 'express';
import { createUser, deleteUser, getAllUser, getOneUser, updateUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/createuser', createUser);
userRouter.put('/updateuser/:id', updateUser);
userRouter.get('/getalluser', getAllUser);
userRouter.get('/getoneuser/:id', getOneUser);
userRouter.delete('/deleteuser/:id', deleteUser);

export default userRouter;
