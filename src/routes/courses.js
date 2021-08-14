const express = require('express')
const router = express.Router();
const {
  getAllCourses,
  getCoursesById,
  deleteCourseById,
  updateCourseById,
  createCourse,
  // tryCatch
} = require ('../controllers/courses')

router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCoursesById);
router.delete('/:id', deleteCourseById);
router.put('/:id', updateCourseById)

module.exports = router;