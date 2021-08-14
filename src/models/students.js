const {Schema, model} = require('mongoose')

const Joi = require('joi')


//joi, express-validator backend
//validator.js frontend

const schema = Schema({
  firstName : {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate:{
      validator: (email)=>{
        // const validation = Joi.string().email().validate(email);
        // const {error} = validation;
        // if(error){
        //   return false;
        // }else{
        //   return true;
        // }
        //error is not null is failed
        return !Joi.string().email().validate(email).error;
      },
      msg: 'Invalid email format',
    }
  },
  courses: [{
    type: String,
    ref: 'Course'
  }]
});

schema.virtual('fullName').get(function(){
  return `${this.firstName} ${this.lastName}`;
})

module.exports=model('Student', schema)