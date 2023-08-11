
import { mongooseConnection } from "../../../lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import  {buffer} from 'micro'
import { Order } from "../../../models/Order";

export default async function handler(req, res) {
  await mongooseConnection()

  const sig = req.headers['stripe-signature'];
  const endpointSecret = "whsec_516b3845d3379996b7539693af2ac5dbcad49b3a3b0e1e048bc11ebd061e8049";
  let event;

  try {
    event = stripe.webhooks.constructEvent( await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object
      const orderId = data.metadata.orderId
      const paid = data.payment_status === 'paid'
      console.log(data)
      if (orderId && paid) {
       await Order.findByIdAndUpdate(orderId, {
          paid:true
        })
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send('ok')

}

export const config = {
  api: {bodyParser:false,}
}
   