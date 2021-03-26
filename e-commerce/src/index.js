const app = require('./app')
const PORT = process.env.PORT

app.listen(PORT, ()=> { console.log('data on localhost:3000')})