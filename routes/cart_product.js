'use strict'

const { ObjectId } = require("bson")
const { default: fastify } = require("fastify")

module.exports = async function (fastify, opts) {
	fastify.patch('/cart_product', async function (request, reply) {
    const carts = this.mongo.db.collection('cart')
    const cart_products = this.mongo.db.collection('cart_product')
    const users = this.mongo.db.collection('users')

    const id = ObjectId(request.body.user_id)
    const cart = await carts.findOne({_id : id})
    const cart_product = await cart_products.findOneAndUpdate({
      _id: cart._id, product_id: request.body.product_id}, {
      count: request.body.count,
    }).then(result => {
      reply
        .code(200)
        .header('Content-type','application/json')
        .send(result)
    }).catch(err => {
      reply
        .code(500)
        .send(err)
    })
	})
}