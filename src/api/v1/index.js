const Router = require('koa-router')
const { fetch } = require('./java')
const isIp = require('is-ip')

const { Resolver } = require('dns').promises;
const resolver = new Resolver();
const router = new Router({
  prefix: '/v1'
})

router.get('/java', async (ctx) => {
  let host = ctx.query.host
  if (!isIp(host)) {
    let srvIp = host.startsWith("_minecraft._tcp.") ? host : '_minecraft._tcp.' + host
    let srv = await resolver.resolveSrv(srvIp).catch(err => { })
    if (srv?.length) {
      host = srv[0].name
      port = srv[0].port
    }
  }
  try {
    let r = await fetch(host, ~~ctx.query.port)
    ctx.body = r
  } catch (e) {
    ctx.status = 403
    ctx.body = {
      message: e.message
    }
  }
})

module.exports = router