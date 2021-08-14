module.exports = (error, req, res, next)=>{
  console.log(error.name);
  if(error.name ==='validationError'){
    if (process.env.NODE_ENV ==='production'){
      // const {details} = error;
      // const errMsg = details.map((i) => ({ 
      //   message: i.message
      // }))
      return res.status(400).json(error.message)
    }else{
      return res.status(400).json(error)
    }
  }
  console.log(error);
  
  return res.status(500).send('something happened, please try again');
}

// {
//   data: [],
//   error: ""
// }