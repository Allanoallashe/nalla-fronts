import { mongooseConnection } from "../../../lib/mongoose";
import { Order } from "../../../models/Order";
import { Product } from "../../../models/Product";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const handler = async (req,res) => {
  await mongooseConnection();
  if (req.method !== 'POST') {
    res.json('must be a POST request')
    return;
  }
  const { name, email, city, postCode, streetAddress, country, cartProducts } = req.body
  const productsIDs = cartProducts
  const uniqueIDs = [...new Set(productsIDs)]
  const productInfo = await Product.find({ _id: uniqueIDs })
  
  let line_items = []
  for (const productId of uniqueIDs) {
    const infoProduct = productInfo.find(p => p._id.toString() === productId)
    const quantity = productsIDs.filter(id=>id === productId)?.length || 0
    if (quantity > 0 && infoProduct) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'KES',
          product_data: { name: infoProduct.title},
          unit_amount: quantity * infoProduct.price *100,
        }
        })
      }
  }
  const orderDoc = await Order.create({
   line_items,name,email,city,postCode,streetAddress,country,paid:false,
  })
  const stripeSession =  await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: {orderId: orderDoc._id.toString()}
  })
  res.json({
    url:stripeSession.url,
  })
}

export default handler