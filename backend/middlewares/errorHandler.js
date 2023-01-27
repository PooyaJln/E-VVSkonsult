// const { logEvents } = require('./logEvents')
// const errorHandler = (err, req, res, next) => {
//     logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
//     console.error(err.stack)
//     res.status(500).send(err.message)
// }
const errorHandler = async (err, req, res, next) => {
  if ((err && err.status == 400) || err.status == 404) {
    console.error(err);
    return await res.status(err.status).json({ error: err.message });
  }
  next();
};
module.exports = errorHandler;
