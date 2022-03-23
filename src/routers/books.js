// Import data here...
const express = require("express")
const router = express.Router()
const data = require("../../data.js")

// Write routes here...
router.get("/", (req, res) => {
    res.json({ books: data.books })
})

router.get("/:id", (req, res) => {
    const bookId = parseInt(req.params.id)
    const findBook = data.books.find(x => x.id === bookId)
    res.json({ book: findBook })
})

router.post("/", (req, res) => {
    const newBook = {
        id: data.books.length + 1,
        title: req.body.book.title,
        type: req.body.book.type
    }
    data.books.push(newBook)
    res.json({ book: newBook })
})

router.patch("/:id", (req, res) => {
    const userId = parseInt(req.params.id)
    const existingBook = data.books.find(x => x.id === userId)
   if(!existingBook){
    res.status(404)
    res.json({error : "Book not found"})   
    return
   }

   if(!req.body.title && !req.body.type && !req.body.author){
       res.status(400)
       res.json({ error : "incorrect patch details"})
   }

   for(const body in req.body){
       existingBook[body] = req.body[body]
   }



    res.json({ book: existingBook })
})

module.exports = router