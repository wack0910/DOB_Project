'use strict'

const { ObjectId } = require("bson")

module.exports = async function (fastify, opts) {
  // 사용자가 상품 조회
  // category 로 조회하는 경우 (header에 카테고리:bag 실어서 보내줘야함)
  fastify.get('/products', async function (request, reply) {
    const products = this.mongo.db.collection('products')

    if(request.headers.category) {
      const result = await products.find({category: request.headers.category}).toArray()
      reply
        .code(201)
        .header('Content-type', 'application/json')
        .send(result)
    }
    // brand 일 때

    // price 일 때

    // name 일 때

    if(products) {
      const result = await products.find({}).toArray()
      reply
        .code(201)
        .header('Content-type', 'application/json')
        .send(result)
    }
  })

  // 판매자가 상품 등록
	fastify.post('/products', async function (request, reply) {
    const products = this.mongo.db.collection('products')
    const users = this.mongo.db.collection('users')

    const id = ObjectId(request.body.user_id)
    const user = await users.findOne({_id : id})

    if(request.headers.Authorization === 'aaa') {
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