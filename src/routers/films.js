const express = require("express")
const router = express.Router()
const data = require("../../data.js")

router.get("/", (req, res) => {
    res.json({ films: data.films })
})

router.get("/:id", (req, res) => {
    const filmsId = parseInt(req.params.id)
    const films = data.films.find(x => x.id === filmsId)
    res.json({ films: films })
})

router.post("/", (req, res) => {
    const newFilms = {
        id: data.films.length + 1,
        films: req.body.title
    }
    data.films.push(newFilms)
    res.json({ films: newFilms })

})

router.patch("/:id", (req, res) => {
    const userId = parseInt(req.params.id)
    const existingMovie = data.films.find(x => x.id === userId)

    if (!existingMovie) {
        res.status(404)
        res.json({ error: "Movie does not exist" })
        return
    }
    if (!req.body.title && !req.body.director) {
        res.status(400)
        res.json({ error: 'incorrect patch details' })
    }

    for(const body in req.body){
        existingMovie[body] = req.body[body]
    }

    res.json({ film: existingMovie })
})


/*router.put("/:id", (req, res) => {
    const userId = parseInt(req.params.id)
    const existingUser = data.users.find(x => x.id === userId)
    if (!existingUser) {
        res.status(404)
        res.json({ error: "user does not exist" })
        return
    }
    if (!req.body.email) {
        res.status(400)
        res.json({ error: 'email not specified' })
    }
    existingUser.email = req.body.email
    res.json({ user: existingUser })
})*/

module.exports = router