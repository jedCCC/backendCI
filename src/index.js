const {connectToDB} = require('./utils/db')
// const logger = require('./utils/logger')
const app = require('./app')

const PORT = process.env.PORT || 3000;
connectToDB();


app.listen(PORT, () => {
  console.log(`db is listening on port ${PORT}`);
})