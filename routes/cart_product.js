'use strict'

const {
  ObjectId
} = require("bson")
const {
  default: fastify
} = require("fastify")



module.exports = async function (fastify, opts) {
  fastify.get('/cart', async function(request, reply) {
    const cart = this.mongo.db.collection('cart')
    
    if(request.headers.user_id){
      const result = await cart.find({user_id: request.headers.user_id}).toArray()
      reply
        .code(200)
        .header('Content-type', 'application/json')
        .send(result)
    }

    else{
      reply
        .code(403)
        .header('Content-type', 'application/json')
        .send('Not Found')
    }
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

    const cart = await carts.findOneAndDelete({
      user_id: request.body.user_id,
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
