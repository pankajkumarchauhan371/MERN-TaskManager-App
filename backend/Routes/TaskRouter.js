const { fetchTasks, createTask, updateTaskById, deleteTaskById } = require('../Controllers/TaskController');

const router = require('express').Router();

router.get('/', fetchTasks);
router.post('/', createTask);
router.put('/:id', updateTaskById);
router.delete('/:id', deleteTaskById);

module.exports = router;