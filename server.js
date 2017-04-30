const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
// middleware (the order of calls affect, in this case, when using the static call at first, helphtml rendered okay when it shouldn't )
// if you don't call next, the server will never call the gets
app.use((request, response, next) => {
  var now = new Date().toString()
  var log = `${now}: ${request.method} ${request.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (error) => {
    if(error)
      console.log('Unable to append to server log.')
  })
  next()
})
// app.use((request, response, next) => {
//   response.render('maintenance.hbs', {
//     pageTitle: 'Website under maintenance'
//   })
// })
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (request, response) => {
  response.render('home.hbs', {
    welcomeMsg: 'Welcome Damián!',
    pageTitle: 'Home Page',
  })
})

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
  })
})

app.get('/bad', (request, response) => {
  response.send({
  errorMessage: 'Unable to fulfill request'
  })
})

app.get('/projects', (request, response) => {
  response.render('projects.hbs', {
  pageTitle: 'My Projects'
  project: 'This is a new project'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})


// Commands:
// git add .
// git commit -m ""
// git push
// heroku create (create a new application)
// git push heroku
