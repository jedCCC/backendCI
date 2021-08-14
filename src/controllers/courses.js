const Course = require('../models/courses');
const Joi = require('joi');
const Student = require('../models/students');

// function tryCatch(routeHandler){
//   return(req, res, next)=>{
//   try{
//     routeHandler(req, res, next);
//   }catch(e){
//     next();
//   }}
// }

async function getAllCourses(req, res) {
  const courses = await Course.find().exec();
  res.json(courses)
  //Course.findById().then().catch();
  //Course.findById(id, function(err, adventure){
  // })
}

async function getCoursesById(req, res) {
  const { id } = req.params;
  const courses = await Course.findById(id).populate('students').exec();
  if (!courses) {
    return res.sendStatus(404)
  }
  return res.json(courses)
}

async function createCourse(req, res) {
  //validate data
  // const { code, name, description } = req.body;
  const stringValidator = Joi.string().min(2).max(10).required();
  const schema = Joi.object({
    name: stringValidator,
    code: Joi.string()
      .regex(/^[a-zA-Z0-9]+$/)
      .required(),
    description: Joi.string()
  })
  const { code, name, description } = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: false,
  })
  const exist=await Course.findById(code).exec();
  if (exist){
    //duplicate course code
    return res.sendStatus(409);
  }
  const course = new Course({ _id: code, name, description })


  await course.save();

  // try{
  //   await students.save();
  // }catch(e){
  //   next(e)
  // }

  // student.save((error, result)=>{
  //   if(error){
  //     return next(e);
  //   }
  //   res.status(201).json(result)
  // })

  // students.save().then((result)=>{
  //   res.status(201).json(result)
  // }).catch((e)=>{
  //   next(e);
  // })

  return res.status(201).json(course)
}

async function deleteCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id).exec()

  if (!course) {
    res.sendStatus(404)
  }
  await Student.updateMany({
    courses: course._id
  }, {
    $pull: {
      courses: course._id
    }
  });
  return res.sendStatus(204).json(course);
}

async function updateCourseById(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  const updateCourse = await Course.findByIdAndUpdate(id,
    { name, description },
    { new: true }).exec()
  if (!updateCourse) {
    return res.sendStatus(404)
  }
  return res.json(courses)
}

module.exports = {
  getAllCourses,
  getCoursesById,
  createCourse,
  deleteCourseById,
  updateCourseById,
  // tryCatch
}