// @ts-check
// const { logEvents } = require('./logEvents')
// const errorHandler = (err, req, res, next) => {
//     logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
//     console.error(err.stack)
//     res.status(500).send(err.message)
// }
const errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  if ((err && err.status == 400) || (err && err.status == 404)) {
    console.error(err);
    return res.status(err.status).json({ error: err.message });
  }
  if (err && !err.status) {
    console.error(err);
    return res.status(500).json({ error: "internal server error" });
  }
  next();
};
module.exports = errorHandler;
