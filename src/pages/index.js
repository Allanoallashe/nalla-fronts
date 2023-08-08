import Featured from "@/components/Featured"
import Header from "@/components/Header"
import { mongooseConnection } from "../../lib/mongoose"
import { Product } from "../../models/Product"
import NewProducts from "@/components/NewProducts"

 
const Home = ({ featuredProduct, newProducts }) => {
  return (
    <div>
      <Header />
      <Featured featuredProduct={featuredProduct} />
      <NewProducts newProducts= {newProducts} />
     </div>
   )
}

  export async function getServerSideProps(){
    const featuredProductId = '64b06d6f34a44712c93304f0'
    const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 })
    await mongooseConnection()
    const featuredProduct = await Product.findById(featuredProductId)
    return {
      props: {
        featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
        newProducts: JSON.parse(JSON.stringify(newProducts)),
      }
    }
  }
 
export default Home