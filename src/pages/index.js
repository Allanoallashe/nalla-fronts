import Featured from "@/components/Featured"
import Header from "@/components/Header"
import { mongooseConnection } from "../../lib/mongoose"
import { Product } from "../../models/Product"
import NewProducts from "@/components/NewProducts"
import { Toaster } from "react-hot-toast"
import ReactCarousel from "@/components/Carousel"

 
const Home = ({ featuredProduct, newProducts }) => {
  return (
    <div>
      <Header />
      <Toaster />
      <ReactCarousel images={newProducts} />
      <Featured  featuredProduct={featuredProduct} />
      <NewProducts newProducts= {newProducts} />
     </div>
   )
}

  export async function getServerSideProps(){
    await mongooseConnection()
    const featuredProductId = '64b06d6f34a44712c93304f0'
    const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10})
    const featuredProduct = await Product.findById(featuredProductId)
    return {
      props: {
        featuredProduct: await JSON.parse(JSON.stringify(featuredProduct)),
        newProducts: await JSON.parse(JSON.stringify(newProducts)),
      }
    }
  }
 
export default Home