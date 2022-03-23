const express = require("express");
const router = express.Router()
const data = require('../../data.js')

router.get("/", (req, res) => {
    res.json({ users: data.users })
  })
  
  router.get("/:id", (req, res) => {
    const bookId = parseInt(req.params.id)
    const findUser = data.users.find(x => x.id === bookId)
    res.json({ user: findUser })
  })
  
  router.delete("/:id", (req, res) => {
    const deleteUserId = parseInt(req.params.id)
    const deleteUser = data.users.find(x => x.id === deleteUserId)
    if (!deleteUser) {
      res.status(404)
      res.json({ error: "user does not exist" })
      return
    }
    data.users = data.users.filter(x => x !== deleteUser)
  
    res.json({ delete: deleteUser })
  })
  
  
  router.put("/:id", (req, res) => {
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
  })

  module.exports = router