// @ts-check
// const { logEvents } = require('./logEvents')
// const errorHandler = (err, req, res, next) => {
//     logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
//     console.error(err.stack)
//     res.status(500).send(err.message)
// }
const errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  try {
    console.error(err);
    if ((err && err.status == 400) || (err && err.status == 404)) {
      return res.status(err.status).json({ error: err.message });
    }
    if (err && err.errors[0]) {

      if (err && err?.errors[0].type == "Validation error") {
        return res.status(400).json({ error: err.errors[0].message });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }




};
module.exports = errorHandler;
