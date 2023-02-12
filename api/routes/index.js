exports.setRoutes = app => {
    app.use('/', require('./main.route'));
    app.use('/auth', require('./auth.route'));
}