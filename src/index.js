const {connectToDB} = require('./utils/db')
// const logger = require('./utils/logger')
const app = require('./app')

const PORT = process.env.PORT || 3000;
connectToDB();


app.listen(PORT, () => {
  logger.info(`db is listening on port ${PORT}`);
})