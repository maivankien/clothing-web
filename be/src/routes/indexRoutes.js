const userRouters = require('./userRoutes')



const route = (app) => {
    app.use('/api/user', userRouters)
}

module.exports = route