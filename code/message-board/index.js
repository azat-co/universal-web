require('babel-register')({
  presets: [ 'react' ]
})
const express = require('express'),
  mongodb = require('mongodb'),
  app = express(),
  bodyParser = require('body-parser'),
  validator = require('express-validator'),
  logger = require('morgan'),
  errorHandler = require('errorhandler'),
  compression = require('compression'),
  url = 'mongodb://localhost:27017/board'

// TODO: Import React library

// TODO: Import React components

mongodb.MongoClient.connect(url, function(err, db) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  app.use(compression())
  app.use(logger('dev'))
  app.use(errorHandler())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(validator())
  app.use(express.static('public'))

  app.set('view engine', 'hbs')

  app.use(function(req, res, next){
    req.messages = db.collection('messages')
    return next()
  })

  app.get('/messages', function(req, res, next) {
    req.messages.find({}, {sort: {_id: -1}}).toArray(function(err, docs){
      if (err) return next(err)
      return res.json(docs)
    })
  })
  app.post('/messages', function(req, res, next){
    console.log(req.body)
    req.checkBody('message', 'Invalid message in body').notEmpty()
    req.checkBody('name', 'Invalid name in body').notEmpty()
    let newMessage = {
      message: req.body.message,
      name: req.body.name
    }
    var errors = req.validationErrors()
    if (errors) return next(errors)
    req.messages.insert(newMessage, function (err, result) {
      if (err) return next(err)
      return res.json(result.ops[0])
    })
  })

  app.get('/', function(req, res, next){
    req.messages.find({}, {sort: {_id: -1}}).toArray(function(err, docs){
      if (err) return next(err)
      res.render('index', {})
      // TODO: Render HTML and data
    })
  })

  app.listen(3000)
})
