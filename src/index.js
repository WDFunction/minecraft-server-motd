const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa();
const router = new Router();

app.use(router.routes()).use(router.allowedMethods())
app.use(require('./api/v1').routes())

const server = app.listen(9000)
server.keepAliveTimeout = 0
server.timeout = 0