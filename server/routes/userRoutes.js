const express = require("express");
const { getAllUsers, getSingleUser, createUser, deleteUser, updateUser } = require("../controller/userController");
const router = express.Router();

router.route("/")
    .get(getAllUsers)
    .post(createUser)

router.route("/:id")
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;