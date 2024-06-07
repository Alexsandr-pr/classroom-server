const Comment = require("../models/Comment");
const User = require("../models/User")
const Course = require("../models/Course")


class CommentController {
    async addComment (req, res) {
        try {
            const { text, author_id, course_id } = req.body;
            const author = await User.findById(author_id);

            if (!author) {
                return res.status(404).json({ message: 'Author not found' });
            }
    
            // Validate if class exists
            const classExists = await Course.findById(course_id);
            if (!classExists) {
                return res.status(404).json({ message: 'Class not found' });
            }
    
            // Create a new comment
            const newComment = new Comment({ text, author_id, class_id });
            await newComment.save();
    
            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Delete a comment
    async deleteComment (req, res) {
        try {
            const { id } = req.params;
    
            // Check if comment exists
            const commentToDelete = await Comment.findById(id);
            if (!commentToDelete) {
                return res.status(404).json({ message: 'Comment not found' });
            }
    
            // Delete the comment
            await commentToDelete.remove();
    
            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Update a comment
    async updateComment (req, res) {
        try {
            const { id } = req.params;
            const { text } = req.body;
    
            // Check if comment exists
            const commentToUpdate = await Comment.findById(id);
            if (!commentToUpdate) {
                return res.status(404).json({ message: 'Comment not found' });
            }
    
            // Update comment text
            commentToUpdate.text = text;
            await commentToUpdate.save();
    
            res.status(200).json(commentToUpdate);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Get a comment by ID
    async getCommentById  (req, res) {
        try {
            const { id } = req.params;
    
            // Find the comment by ID
            const commentDetails = await Comment.findById(id).populate('author_id', 'first_name last_name email');
    
            if (!commentDetails) {
                return res.status(404).json({ message: 'Comment not found' });
            }
    
            res.status(200).json(commentDetails);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    // Get all comments for a class
    async getCommentsByCourseId  (req, res)  {
        try {
            const { course_id } = req.params;
    
            // Find all comments for the class
            const comments = await Comment.find({ course_id }).populate('author_id', 'first_name last_name email');
    
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
}

module.exports = new CommentController;