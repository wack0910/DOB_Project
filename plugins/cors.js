'use strict'

const fp = require('fastify-plugin')

const cors = require('@fastify/cors')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/cors'), {
    // options
  })
})
