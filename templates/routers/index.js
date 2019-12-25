const Router = require('koa-router')()
const router = new Router()

// const user = require('./user')


router.get('/', async (ctx, next) => {
  return ctx.body = 'hello world'
})

// router.use(user.routes({ prefix: '/user' }), user.allowedMethods()); // prefix '/user' 


module.exports = router