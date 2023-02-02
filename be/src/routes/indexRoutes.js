const userRouters = require('./userRoutes')
const adminRoutes = require('./adminRoutes')


const route = (app) => {
    app.use('/api/user', userRouters)
    app.use('/api/admin', adminRoutes)
}

module.exports = route