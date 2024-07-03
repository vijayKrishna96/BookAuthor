const { AuthMechanism } = require("mongodb");
const Author = require("../Model/authorModel");

const getAllAuthors = async(req, res) => {
    const Author = await Author.find({});
    res.json(Author)
}

const getAuthorsById = async(req , res) =>{
    try{
        const Author = await Author.findById(req.params.authorId).exec();

        if(!Author){
            return res.status(404).json({message: 'Author Not Found'});
        }
        res.status(200).json(Author);

    }catch{
        res.status(500).json({message : 'Server error',error : error.message});
    }
}

const addNewAuthor = async(req , res) =>{
    const authorData = req.body;
    const author = new Author(authorData)
    await author.save();
    res.status(201).json(author)
}
const updateAuthor = async(req ,res )=>{
    try{
        const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.authorId,
            req.body,
            {new: true}
        );
        res.status(201).json(updateAuthor)
    }catch{
        res.status(404).send("author not updated")
    }
}
const deletAuthor = async(req, res) =>{
    try{
        const deleted = await Author.findByIdAndDelete(
            req.params.authorId,
            req.body,
            {new: true}
        )
        res.status(201).json({ message: 'Deleted Author' });
    }catch{
        res.status(404).json({message : 'Author Not Deleted'})
    }
}

module.exports = {
    getAllAuthors,
    getAuthorsById,
    addNewAuthor,
    updateAuthor,
    deletAuthor
}