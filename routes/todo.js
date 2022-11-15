var express = require('express');
const {db} = require("../mongo");
var router = express.Router();
const {uuid} = require('uuidv4');
const {ObjectId} = require("mongodb");
const {validateTodo} = require('../validation/todo');

const mockTodos = [{
    id: "4387f4d8-aeac-4559-9f1b-3c5d537c955c",
    title: "Implement Fullstack ToDo List",
    description: "Implement the fullstack todo list application.",
    isComplete: false,
    priority: "High",
    creationDate: new Date(),
    lastModified: new Date(),
    completedDate: null
}, {
    id: "e365f13c-4c1d-4ee1-8a66-3dbbbab71f0d",
    title: "Create /all route for mock data",
    description: "Create an express route that will respond with the mock todo list.",
    isComplete: false,
    priority: "High",
    creationDate: new Date(),
    lastModified: new Date(),
    completedDate: null
}, {
    id: "08dd1f20-7d31-4120-89ed-343d4006a7cb",
    title: "Create a home page in the client",
    description: "Create a Home Page in React that will display all the todos.",
    isComplete: false,
    priority: "High",
    creationDate: new Date(),
    lastModified: new Date(),
    completedDate: null
}, {
    id: "98a06f8f-50c9-4832-9d2d-daa45543db00",
    title: "Create the todo card component",
    description: "Create a react ToDoCard component that will be rendered for each todo on the home page.",
    isComplete: false,
    priority: "Medium",
    creationDate: new Date(),
    lastModified: new Date(),
    completedDate: null
}, {
    id: "7c5d70bb-2a00-4009-9bb8-1bb163fb501f",
    title: "Test basic application with mock data",
    description: "Visit the client Home Page to see the todo's displayed as a list.",
    isComplete: false,
    priority: "Medium",
    creationDate: new Date(),
    lastModified: new Date(),
    completedDate: null
}]


/* GET home page. */
router.get('/', function (req, res, next) {
    res.json(mockTodos);
});
router.get('/all', async function (req, res) {
    try {
        const cursor = db().collection("todos").find({});
        const data = await cursor.toArray();

        // console.log(data);
        res.json({
            success: true,
            data: data

        })
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
})
/* GET get todo by ID*/
router.get('/:id', async (req, res) => {
    try {
        const found = await db().collection('todos').findOne({_id: ObjectId(req.params.id)})

        res.json({
            success: true,
            data: found
        })
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
})
/* POST  add one todo */
router.post('/add', function (req, res) {
    const newTodo = {
        title: req.body.title,
        description: req.body.description,
        isComplete: req.body.isComplete,
        priority: req.body.priority,
        creationDate: new Date(),
        lastModified: new Date(),
        completedDate: req.body.completedDate || null
    }

    const isValid = validateTodo(newTodo);

    try {
        // console.log("adding todo");
        if (isValid.isValid === true) {
            db().collection("todos").insertOne(newTodo)
                .then(result => {
                    db().collection('todos').findOne({_id: ObjectId(result.insertedId.toString())})
                        .then(found => {
                            res.json({
                                success: true,
                                inserted: found
                            })
                        })
                })


        } else {
            res.json({
                success: false,
                errors: isValid.errors
            })
        }
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
});

/* UPDATE update one todo*/
router.put('/update/:id', async (req, res) => {
    req.body.lastModified = new Date();
    try {
        const found = await db().collection("todos").updateOne({_id: ObjectId(req.params.id)}, {$set: req.body}, {upsert: true});
        const updated = await db().collection('todos').findOne({_id: ObjectId(req.params.id)})
            console.log(updated);

        // console.log(cursor);
        res.json({
            success: true,
            data: updated
        })
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
})
/* DELETE delete one todo */
router.delete('/delete/:id', (req, res) => {
    try {
        db().collection("todos").findOneAndDelete({_id: ObjectId(req.params.id)});
        res.json({
            success: true
        })
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
})
// initialize data
router.post('/init', (req, res) => {
    try {
        db().collection("todos").insertMany(mockTodos);
        res.json({
            success: true
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})
module.exports = router;