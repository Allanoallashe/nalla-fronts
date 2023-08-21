import { mongooseConnection } from "../../../lib/mongoose";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  try {
     
    await mongooseConnection()
    const { query } = req.query

    if (!query) {
      return res.status(400).json({message:'missing search.'})
    }

    const autoCompleteOptions = await Product.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        {description: {$regex: query, $options: 'i'}}
      ],
    }).select('title').limit(10)

    const options = autoCompleteOptions.map((product)=> product.title)

    return res.status(200).json(options)
  } catch (err) {
    console.error({err})
    res.status(500).json({message:'internal server error'})
   }
 }