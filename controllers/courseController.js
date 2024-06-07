
const Course = require("../models/Course")
const User = require("../models/User");
class CourseController {

    async addCourse (req, res){
        try {
            const { name, teacher_id } = req.body;
    
            // Validate if teacher exists
            const teacher = await User.findById(teacher_id);
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher not found' });
            }
    
            // Create a new class
            const newClass = new Course({ name, teacher_id });
            await newClass.save();
    
            res.status(201).json(newClass);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    async deleteCourse(req, res) {
        try {
            const { id } = req.params;
    
            // Check if class exists
            const classToDelete = await Course.findById(id);
            if (!classToDelete) {
                return res.status(404).json({ message: 'Class not found' });
            }
    
            // Delete the class
            await classToDelete.remove();
    
            res.status(200).json({ message: 'Class deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    async updateCourseName(req, res){
        try {
            const { id } = req.params;
            const { name } = req.body;
    
            const classToUpdate = await Course.findById(id);
            if (!classToUpdate) {
                return res.status(404).json({ message: 'Class not found' });
            }
    
            // Update class name
            classToUpdate.name = name;
            await classToUpdate.save();
    
            res.status(200).json(classToUpdate);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    async getCourseById (req, res) {
        try {
            const { id } = req.params;
    
            // Find the class by ID
            const classDetails = await Course.findById(id).populate('teacher_id', 'first_name last_name email');
    
            if (!classDetails) {
                return res.status(404).json({ message: 'Class not found' });
            }
    
            res.status(200).json(classDetails);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    async getAllCourse(req, res) {
        try {
            const classes = await Course.find().populate('teacher_id', 'first_name last_name email');
    
            res.status(200).json(classes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = new CourseController