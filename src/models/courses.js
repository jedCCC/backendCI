const {Schema, model} = require('mongoose')

const schema = Schema({
  _id: {
    type: String,
    upperCase: true,
    alias: 'code'
  },
  name:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    default: 'this is description'
  },
  __v: {
    type: Number,
    select: false
  },
  students:[{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }]
},{
  toJSON:{
    virtuals: true
  },
  id: false,
})

// schema.virtual('code').get(function(){
//   return this._id;
// })

module.exports = model('Course', schema);