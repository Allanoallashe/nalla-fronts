import { mongooseConnection } from "../../../lib/mongoose";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  try {
    await mongooseConnection()
    const { query } = req.query
    
    if (!query) {
      return res.status(400).json({message:'Missing Search.'})
    }

  
    const searchResults = await Product.find({

      $or: [
        { title: { $regex: query, $options: 'i' } },
        {description: {$regex: query, $options: 'i'}}
      ],


    }).select({})
    const results = searchResults.map((product)=> product)

 


    return res.status(200).json(results)
    
    
  } catch (err) {
    res.status(500).json({message:'internal server error'})
  }
}