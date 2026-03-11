const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { createTodo, getTodos, deleteTodo, toggleTodo } = require("../controllers/todoController");

router.post("/", authMiddleware, createTodo);

router.get("/", authMiddleware, getTodos);

router.delete("/:id", authMiddleware, deleteTodo);

router.put("/:id", authMiddleware, toggleTodo);

module.exports = router;