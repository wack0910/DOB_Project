// 'use strict'

// // 자신의 장바구니 조회
// module.exports = async function(fastify, opts) {
//     fastify.get('/cart', async function(request, reply) {
//       const cart = this.mongo.db.collection('cart')
      
//       if(request.headers.user_id){
//         const result = await cart.find({user_id: request.headers.user_id}).toArray()
//         reply
//           .code(200)
//           .header('Content-type', 'application/json')
//           .send(result)
//       }

//       else{
//         reply
//           .code(403)
//           .header('Content-type', 'application/json')
//           .send('Not Found')
//       }
//     })
// }