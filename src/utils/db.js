
const mongoose = require('mongoose');


exports.connectToDB= ()=>{
  let database = process.env.DB_DATABASE || 'mongodb://localhost:27017/jr-cms-13'
  if(process.env.NODE_ENV==='test'){
    database += '_test';
  }
  const CONNECTION_STRING = `${process.env.DB_HOST}:${process.env.DB_PORT}/${database}`;

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log(`db connected to ${process.env.DB_DATABASE}`);
  })
  db.on('error', () => {
    console.log('db connection failed');
    console.log(error.message);
    process.exit(1);
  })
  db.on('disconnected', () => {
    console.log('bye');
  })

  mongoose.connect(CONNECTION_STRING, 
    {useNewUrlParser: true, 
    useUnifiedTopology: true});
}

exports.disconnectDB = async ()=>{
  return mongoose.disconnect()
}

