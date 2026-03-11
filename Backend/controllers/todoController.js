const Todo = require("../models/Todo");

// CREATE TODO
exports.createTodo = async (req, res) => {
  try {

    const { text } = req.body;

    const todo = new Todo({
      text,
      userId: req.userId
    });

    await todo.save();

    res.json(todo);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET TODOS
exports.getTodos = async (req, res) => {
  try {

    const todos = await Todo.find({
      userId: req.userId
    });

    res.json(todos);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE TODO
exports.deleteTodo = async (req, res) => {
  try {

    const { id } = req.params;

    await Todo.findByIdAndDelete(id);

    res.json({ message: "Todo deleted" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// TOGGLE TODO
exports.toggleTodo = async (req, res) => {
  try {

    const { id } = req.params;

    const todo = await Todo.findById(id);

    todo.completed = !todo.completed;

    await todo.save();

    res.json(todo);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};