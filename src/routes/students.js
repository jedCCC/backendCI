const express = require('express')
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  deleteStudentById,
  updateStudentById,
  createStudent,
  addStudentToCourse, 
  removeStudentFromCourse
} = require('../controllers/students')

router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.delete('/:id', deleteStudentById);
router.put('/:id', updateStudentById);

router.post('/:id/courses/:code', addStudentToCourse);
router.delete('/:id/courses/:code', removeStudentFromCourse);

module.exports = router;