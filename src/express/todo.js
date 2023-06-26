const express = require('express')
const router = express.Router()

let todos = []

router.get('/', (req, res) => {
  res.json(todos)
})

router.get('/:id', getTodo, (req, res) => {
  res.json(res.todo)
})

router.post('/', (req, res) => {
  const todo = {
    id: Date.now().toString(),
    name: req.body.name,
    completed: req.body.completed || false
  }
  todos.push(todo)
  res.status(201).json(todo)
})

// Updating a todo
router.patch('/:id', getTodo, (req, res) => {
  const todo = res.todo
  if (req.body.name != null) {
    todo.name = req.body.name
  }
  if (req.body.completed != null) {
    todo.completed = req.body.completed
  }
  res.json(todo)
})

// Deleting a todo
router.delete('/:id', getTodo, (req, res) => {
  const index = todos.findIndex(todo => todo.id === req.params.id)
  todos.splice(index, 1)
  res.json({ message: 'Deleted Todo' })
})

function getTodo(req, res, next) {
  const todo = todos.find(todo => todo.id === req.params.id)
  if (todo == null) {
    return res.status(404).json({ message: 'Cannot find todo' })
  }
  res.todo = todo
  next()
}