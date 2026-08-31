const TaskModel = require("../Models/TaskModel")

const createTask = async (req, res) => {
    try {
        const taskModel = new TaskModel(req.body);
        await taskModel.save();
        res.status(201)
            .json({ message: "Task Created", success: true });
    } catch (err) {
        res.status(500).json({ message: "Failed to create Task", success: false, err });
    }
}

const fetchTasks = async (req, res) => {
    try {
        const allTasks = await TaskModel.find({});
        res.status(200)
            .json({ message: "Success", success: true, data: allTasks });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch Task", success: false });
    }
}
const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('id ', id, req.body);
        const updateDoc = { $set: { ...req.body } }
        await TaskModel.findByIdAndUpdate(id, updateDoc);
        res.status(200)
            .json({ message: "Task Updated", success: true });
    } catch (err) {
        res.status(500).json({ message: "Failed to update Task", success: false });
    }
}

const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id)
        res.status(200)
            .json({ message: "Task Deleted", success: true });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete Task", success: false, err });
    }
}

module.exports = {
    createTask,
    fetchTasks,
    updateTaskById,
    deleteTaskById
}