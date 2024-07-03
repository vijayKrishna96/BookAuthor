const express = require("express")
const { getAllAuthors, getAuthorsById, addNewAuthor, updateAuthor, deletAuthor } = require("../Controllers/authorControllers")
const router = express.Router()


router.get("/",getAllAuthors)

router.get('/:authorId',getAuthorsById)

router.post("/",addNewAuthor)

router.patch('/:authorId',updateAuthor)

router.delete('/:authorId',deletAuthor)

module.exports = router;