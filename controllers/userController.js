import userModel from '../models/userModel.js';
import Notes from '../models/noteModel.js';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import noteModel from '../models/noteModel.js';

export const getAllUser = asyncHandler(async (req, res) => {
    const users = await userModel.find().select('-password').lean();
    if (!users || users.length === 0) {
        return res.status(400).json({ message: 'No users found' });
    }
    res.json(users);
});

export const createUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;

    try {
        const userExists = await userModel.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userObject = { username, password: hashedPassword, roles };

        const newUser = await userModel.create(userObject);

        res.status(201).json({ message: `New user ${username} created successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export const updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedFields = { username: req.body.username, roles: req.body.roles };
        if (req.body.password) {
            updatedFields.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
});

export const getOneUser = asyncHandler(async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
});

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Please provide user id' });
    }

    try {
        const Notes = await noteModel.findOne({ userId: id }).lean().exec();
        if (Notes) {
            return res.status(400).json({ message: 'You cannot delete a user with notes' });
        }

        const user = await userModel.findById(id).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await userModel.deleteOne({ _id: id }).exec();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
