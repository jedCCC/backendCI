
const mongoose = require('mongoose');


exports.connectToDB= ()=>{
  let database = process.env.DB_DATABASE || 'jr-cms'
  if(process.env.NODE_ENV==='test'){
    database += '_test';
  }
  const CONNECTION_STRING = (process.env.DB_HOST || 'mongodb://localhost:27017/')+database;

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log(`db connected`);
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

