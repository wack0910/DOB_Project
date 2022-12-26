'use strict'

const { ObjectId } = require("bson")

module.exports = async function (fastify, opts) {
	fastify.post('/products', async function (request, reply) {
    const products = this.mongo.db.collection('products')
    const users = this.mongo.db.collection('users')

    const id = ObjectId(request.body.user_id)
    const user = await users.findOne({_id : id})
    
    if(user) {
      if(user.user_type === 'Seller') {
        const result = await products.insertOne(request.body)
        reply
          .code(201)
          .header('Content-type', 'application/json')
          .send(result)
      }
    }
    else {
      reply
        .code(403)
        .header('Content-type', 'text/plain')
        .send('No Authorization')
    }
	})
}