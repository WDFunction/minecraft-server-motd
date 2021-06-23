const Router = require('koa-router')
const { fetch: javaFetch } = require('./java')
const { fetch: bedrockFetch } = require('./bedrock')
const isIp = require('is-ip')

const { Resolver } = require('dns').promises;
const resolver = new Resolver();
const router = new Router({
  prefix: '/v1'
})

router.get('/java', async (ctx) => {
  let host = ctx.query.host || ctx.query.ip
  let port = ~~ctx.query.port || 25565
  if (!isIp(host)) {
    let srvIp = host.startsWith("_minecraft._tcp.") ? host : '_minecraft._tcp.' + host
    let srv = await resolver.resolveSrv(srvIp).catch(err => { })
    if (srv?.length) {
      host = srv[0].name
      port = srv[0].port
    }
  }
  try {
    let r = await javaFetch(host, port)
    ctx.body = r
  } catch (e) {
    ctx.status = 403
    ctx.body = {
      message: e.message
    }
  }
})

router.get('/bedrock', async (ctx) => {
  let host = ctx.query.host || ctx.query.ip
  let port = ~~ctx.query.port || 19132
  try {
    let r = await bedrockFetch(host, port)
    ctx.body = {
      data: r
    }
  } catch (e) {
    ctx.status = 403
    ctx.body = {
      message: e.message
    }
  }
})

module.exports = router