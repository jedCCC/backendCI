module.exports = (req, res, next) =>{
  res.setHeader('Allow-Access-Origins', '*')
  res.setHeader('Allow-Access-Methods', 'PUT, DELETE, PUT, POST, OPTIONS')
  res,setHeader('Allow-Access-Headers', 'content-type')
  next();
}