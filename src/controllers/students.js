const Student = require('../models/students')
const Course = require('../models/courses')
const Joi = require('joi');
//express-async-errors

async function getAllStudents(req, res) {
  const students = await Student.find().exec();
  return res.json(students);
}

async function getStudentById(req, res) {
  const { id } = req.params;
  const students = await Student.findById(id).populate('courses', 'name').exec();
  if (!students) {
    return res.sendStatus(404)
  }
  return res.json(students);
}

async function createStudent(req, res) {
  const { firstName, lastName, email } = req.body;
  const students = new Student({ firstName, lastName, email })
  try {
    await students.save();
  } catch (e) {
    return res.sendStatus(400)
  }
  return res.status(201).json(students)
}

async function deleteStudentById(req, res) {
  const { id } = req.params;
  const students = await Student.findByIdAndDelete(id)
  if (!students) {
    return res.sendStatus(404)
  }
  await Course.updateMany(
  {
    _id:{$in: students.courses}
  },
  //   {
  //   students: student_id
  // }, 
  {
    $pull: {
      students: students._id
    }
  });
  return res.sendStatus(204).json(students);
}

async function updateStudentById(req, res) {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  const students = await Student.findByIdAndUpdate(id, { firstName, lastName, email }, { new: true });
  if (!students) {
    return res.sendStatus(404)
  }
  return res.json(students);
}

async function addStudentToCourse(req, res){
  //get student, get course code
  const{id, code} = req.params;
  //find student
  const student = await Student.findById(id).exec();
  //find course
  const course = await Course.findById(code).exec();
  //check student or course exist
  if(!student || !course){
    return res.sendStatus(400);
  }
  //check student is already enrolled
  // if(student.courses.includes(course_id))
  // const oldLenth = student.courses.length
  student.courses.addToSet(course._id);
  course.students.addToSet(student._id);
  //add student to course
  await student.save();
  await course.save();
  //return updated student or return 203
  return res.json(student).status(200)
}


async function removeStudentFromCourse(req, res){
  const {id, code} = req.params;

  const student= await Student.findById(id).exec();
  const course = await Course.findById(code).exec();

  if(!student || !course){
    return res.sendStatus(404)
  }
  student.courses.pull(course._id);
  course.students.pull(student._id);

  await student.save();
  await course.save();

  return res.json(student).status(204);
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudentById,
  updateStudentById,
  addStudentToCourse,
  removeStudentFromCourse
}

