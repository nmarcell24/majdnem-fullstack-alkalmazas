const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Get all Users
//@routes GET /users
const getAllUsers = asyncHandler(async (req, res) =>{
    const users = await User.find();
    res.status(200).json(users);
});

//@desc Get a single user
//@routes GET /users/:id
const getSingleUser = asyncHandler(async (req, res) => {
    const contact = await User.findById(req.params.id);
    if(!contact){
        res.status(404).json({error: "This contact is not excisting."});
    }
    res.status(200).json(contact);
});

//@desc Create a user
//@routes POST /users
const createUser = asyncHandler(async (req, res) => {
    const {name, age} = req.body;
    if (!name || !age){
        res.status(400).json({error: "All fields must be filled."});
    }
    const contact = await User.create({
        name: name,
        age: age,
    });

    res.status(200).json(contact);
});

//@desc Update a user
//@routes PUT /users/:id
const updateUser = asyncHandler(async (req, res) => {
    const contact = await User.findById(req.params.id);
    if(!contact){
        res.status(404).json({error: "This contact is not excisting."});
    }
    
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedUser);
})

//@desc Delete a user
//@routes DELETE /users/:id
const deleteUser = asyncHandler(async (req, res) => {
    const contact = await User.findById(req.params.id);
    if(!contact){
        res.status(404).json({error: "This contact is not excisting."});
    }
    await User.deleteOne({ _id: req.params.id })
    res.status(200).json(contact);
})

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
}