const Router = require('koa-router')
const {fetch, checkSrv} = require('./java')
const router = new Router({
    prefix: '/v1'
})

router.get('/', async (ctx) => {
    
})

module.exports = router