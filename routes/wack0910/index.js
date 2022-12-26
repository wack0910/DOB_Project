'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const users = this.mongo.db.collection('users')
        users.findOne({}, function(err, result) {
            if(err) throw err;
            console.log(result)
          })
    return "최윤석 완료"
  })
}