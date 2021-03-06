const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const Moment = require("moment")
const json = require('koa-json');

const { port } = require('./config/index')

// use json
app.use(json())

// use logger
app.use(logger(str => console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str)))

// use bodyparser
app.use(bodyparser())

// router
app
  .use(require('./routers/index').routes())
  .use(router.allowedMethods())

app.listen(port, () => console.log(`server run ${port}`))