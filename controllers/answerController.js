

const Task = require("../models/Task");
const User = require("../models/User");
const Answer = require("../models/Answer");

class AnswerController {
    async addAnswer  (req, res) {
        try {
            const { text, task_id, author_id } = req.body;
    
            const taskExists = await Task.findById(task_id);
            if (!taskExists) {
                return res.status(404).json({ message: 'Task not found' });
            }
    
            const authorExists = await User.findById(author_id);
            if (!authorExists) {
                return res.status(404).json({ message: 'Author not found' });
            }
    
            const newAnswer = new Answer({ text, task_id, author_id });
            await newAnswer.save();
    
            res.status(201).json(newAnswer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Delete an answer
    async deleteAnswer  (req, res)  {
        try {
            const { id } = req.params;
    
            const answerToDelete = await Answer.findById(id);
            if (!answerToDelete) {
                return res.status(404).json({ message: 'Answer not found' });
            }
    
            await answerToDelete.remove();
    
            res.status(200).json({ message: 'Answer deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Update an answer
    async updateAnswer  (req, res) {
        try {
            const { id } = req.params;
            const { text, task_id, author_id } = req.body;
    
            const answerToUpdate = await Answer.findById(id);
            if (!answerToUpdate) {
                return res.status(404).json({ message: 'Answer not found' });
            }
    
            answerToUpdate.text = text;
            answerToUpdate.task_id = task_id;
            answerToUpdate.author_id = author_id;
            await answerToUpdate.save();
    
            res.status(200).json(answerToUpdate);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Get an answer by ID
    async getAnswerById  (req, res) {
        try {
            const { id } = req.params;
    
            const answerDetails = await Answer.findById(id).populate('task_id').populate('author_id', 'first_name last_name email');
    
            if (!answerDetails) {
                return res.status(404).json({ message: 'Answer not found' });
            }
    
            res.status(200).json(answerDetails);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Get all answers for a task
    async getAnswersByTaskId  (req, res) {
        try {
            const { task_id } = req.params;
    
            const answers = await Answer.find({ task_id }).populate('author_id', 'first_name last_name email');
    
            res.status(200).json(answers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
}

module.exports = new AnswerController