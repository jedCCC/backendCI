const swaggerJsDoc = require('swagger-jsdoc')

const options = {
  definition:{
    openapi: '3.0.0',
    info:{
      title: 'jr cms-13',
      version: '1.0.0',
      contact: {
        name: 'jed',
        email: 'jed.zhang92@gmail.com'
      }
    }
  },
  apis:['./src/controllers/*js']
}
module.exports = swaggerJsDoc(options)