'use strict'

module.exports = async function (fastify, opts) {
	  fastify.get('/', async function (request, reply) {
		      return "박광렬 완료"
		    })
}
