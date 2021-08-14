const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const schema = Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

// static method -> model + functionName
// instance method -> document + functionName
schema.methods.hashPassword = async function(){
  this.password = await bcrypt.hash(this.password, 12);
}

schema.methods.validatePassword = async function (password){
  return bcrypt.compare(password, this.password);
}

module.exports = model('Users', schema);