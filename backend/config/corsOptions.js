const corsWhiteList = [
    'name_of_my_site',
    'http://127.0.0.1',
    'http:localhost'
]; //remove 127.0.0.1 and localhost after development
const corsOptions = {
    origin: function (origin, callback) {
        if (corsWhiteList.indexOf(origin) !== -1 || !origin) { //remove !origin after development
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions;