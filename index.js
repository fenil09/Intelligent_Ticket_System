const application = require('./Routes/auth')
const port = 9000

const setupconnection = require('./connection')

application.listen(port, () => {
    setupconnection()
    console.log('server started at port:'+port)
})


