const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFile) => {
  const dateTime = `${format(new Date(), "yyyymmdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFile),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (req, res, next) => {
  // logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.log')
  console.log("method: ", req.method, " req.originalUrl: ", req.originalUrl);

  next();
};

module.exports = { logEvents, logger };
