const express = require("express")
const { getAllUsers, getUsersById, addNewUser, updateUser, deleteUser,  } = require("../Controllers/userControllers")

const router = express.Router()


router.get("/",getAllUsers)

router.get('/:userId',getUsersById)

router.post("/",addNewUser)

router.patch('/:userId',updateUser)

router.delete('/:userId',deleteUser)

module.exports = router;