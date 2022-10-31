const express = require("express")
const app = express()
const port = 3000
const connectDB = require("./db/connect")
const ejsMate = require("ejs-mate")
require("dotenv").config()
const ToDo = require("./models/model")
const methodOverride = require("method-override")

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => { console.log(`Listening on port ${port}`) })
    } catch (err) {
        console.log(err)
    }
}

start()

app.engine("ejs", ejsMate)
app.set("view engine", "ejs")
app.use(methodOverride("_method"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// get all
app.get("/home", async (req, res) => {
    const toDos = await ToDo.find({})
    res.render("home", { toDos })
})

// get new add to do
app.get("/new", (req, res) => {
    res.render("new")
})

// update all
app.post("/home", async (req, res) => {
    const toDos = await ToDo.create(req.body)
    res.redirect("/home")
})

// get one
app.get("/home/:id", async (req, res) => {
    const toDo = await ToDo.findById(req.params.id)
    res.render("show", { toDo })
})

// update one
app.put("/home/:id", async (req, res) => {
    const { id } = req.params
    let toDoInput = req.body.toDo
    let completed = req.body.completed
    if (completed === undefined) {
        completed = false
    }
    const toDoUpdate = await ToDo.findByIdAndUpdate(id, { toDo: toDoInput, completed: completed }, { runValidators: true })
    res.redirect("/home")
})

// delete one
app.delete("/home/:id", async (req, res) => {
    const { id } = req.params
    const toDoDelete = await ToDo.findByIdAndDelete(id)
    res.redirect("/home")
})