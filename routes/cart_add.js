'use strict'

const {ObjectId} = require("bson");
const { req } = require("pino-std-serializers");

// 장바구니에 물품 담기
module.exports = async function (fastify, opts) {
  fastify.post('/cart', async function (request, reply) {
    const cart = this.mongo.db.collection('cart')
    const users = this.mongo.db.collection('users')
    const products = this.mongo.db.collection('products')

    const u_id = ObjectId(request.body.user_id)
    const user = await users.findOne({_id: u_id})
    const p_id = ObjectId(request.body.product_id)
    const product = await products.findOne({_id: p_id})

    if(user && product){
      const result = await cart.insertOne(request.body)
      reply
        .code(201)
        .header('Contet-type', 'application/json')
        .send(result)
    }

    else{
      reply
        .code(403)
        .header('Contet-type', 'application/json')
        .send("No User or No Product")
    }
  });
}
