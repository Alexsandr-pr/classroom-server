
const Course = require("../models/Course");
const Task = require("../models/Task");

class TaskController {
    async addTask (req, res) {
        try {
            const { name, created_at, text, course_id, is_done } = req.body;
    
            const classExists = await Course.findById(course_id);
            if (!classExists) {
                return res.status(404).json({ message: 'Class not found' });
            }
    
            const newTask = new Task({ name, created_at, text, course_id, is_done });
            await newTask.save();
    
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Delete a task
    async deleteTask  (req, res)  {
        try {
            const { id } = req.params;
    
            const taskToDelete = await Task.findById(id);
            if (!taskToDelete) {
                return res.status(404).json({ message: 'Task not found' });
            }
    
            await taskToDelete.remove();
    
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Update a task
    async updateTask  (req, res) {
        try {
            const { id } = req.params;
            const { name, created_at, text, course_id, is_done } = req.body;
    
            const taskToUpdate = await Task.findById(id);
            if (!taskToUpdate) {
                return res.status(404).json({ message: 'Task not found' });
            }
    
            taskToUpdate.name = name;
            taskToUpdate.created_at = created_at;
            taskToUpdate.text = text;
            taskToUpdate.course_id = course_id;
            taskToUpdate.is_done = is_done;
            await taskToUpdate.save();
    
            res.status(200).json(taskToUpdate);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Get a task by ID
    async getTaskById (req, res) {
        try {
            const { id } = req.params;
    
            const taskDetails = await Task.findById(id).populate('class_id');
    
            if (!taskDetails) {
                return res.status(404).json({ message: 'Task not found' });
            }
    
            res.status(200).json(taskDetails);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    
    async getAllTasks(req, res) {
        try {
            const tasks = await Task.find().populate('class_id');
    
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
}

module.exports = new TaskController