// const { logEvents } = require('./logEvents')
// const errorHandler = (err, req, res, next) => {
//     logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
//     console.error(err.stack)
//     res.status(500).send(err.message)
// }
const errorHandler = (err, req, res, next) => {
  if (err) {
    console.error(err);
    return res.status(err.status).json({ error: err.message });
  }
  if (err && !err.status) {
    return res.status(500).json({ error: "internal server error" });
  }
  next();
};
module.exports = errorHandler;
