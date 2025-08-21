const pathLogger = (req, res, next) => {
    // logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.log')
    console.log('req.originalUrl: ', req.originalUrl)
    console.log('baseUrl: ', req.baseUrl)
    console.log('req.url: ', req.url)
    console.log('req.route: ', req.route)
    console.log('req.path: ', req.path)
    console.log('method: ', req.method);


    next();
}

module.exports = { pathLogger }; 