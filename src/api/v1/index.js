const Router = require('koa-router')
const {fetch, checkSrv} = require('./java')
const router = new Router({
    prefix: '/v1'
})

router.get('/java', async (ctx) => {
    let r = await fetch(ctx.query.ip, ~~ctx.query.port)
    ctx.body = r
})

module.exports = router