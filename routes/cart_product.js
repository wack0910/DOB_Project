'use strict'

const {
  ObjectId
} = require("bson")
const {
  default: fastify
} = require("fastify")



module.exports = async function (fastify, opts) {
  fastify.get('/cart', async function (request, reply) {
    const carts = this.mongo.db.collection('cart')
    const cart_products = this.mongo.db.collection('cart_product')

    const result = await carts.find({}).toArray()
    reply.send(result)
  })

  fastify.patch('/cart', async function (request, reply) {
    const carts = this.mongo.db.collection('cart')
    const users = this.mongo.db.collection('users')

    const id = ObjectId(request.body.user_id)

    const cart = await carts.findOneAndUpdate({
      _id: id,
      product_id: request.body.product_id
    }, {
      count: request.body.count,
    }).then(result => {
      reply
        .code(200)
        .header('Content-type', 'application/json')
        .send(result)
    }).catch(err => {
      reply
        .code(500)
        .send(err)
    })
  })

  fastify.delete('/cart', async function (request, reply) {
    const carts = this.mongo.db.collection('cart')
    const users = this.mongo.db.collection('users')

    const id = ObjectId(request.body.user_id)

    const cart = await carts.findOneAndDelete({
      _id: id,
      product_id: request.body.product_id
    }).then(result => {
      reply
        .code(200)
        .header('Content-type', 'application/json')
        .send('resource deleted successfully')
    }).catch(err => {
      reply
        .code(500)
        .code('no such resource in your cart')
    })
  })
}
