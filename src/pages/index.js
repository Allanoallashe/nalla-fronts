import Featured from "@/components/Featured"
import Header from "@/components/Header"
import { mongooseConnection } from "../../lib/mongoose"
import NewProducts from "@/components/NewProducts"
import { Toaster } from "react-hot-toast"
import ReactCarousel from "@/components/Carousel"
import Product from "../../models/Product"
import { useState } from "react"
import SearchResults from "@/components/SearchResults"

 
const Home = ({ featuredProduct, newProducts, sliderImage, }) => {
  
  const [searchedResults, setSearchedResults] = useState([])
  

  return (
    <div>
      <Header setSearchedResults={setSearchedResults} />
      <Toaster />
      <div className="banner">
        <Featured featuredProduct={featuredProduct} />
        <ReactCarousel images={sliderImage} />
      </div>
      <div>
        <SearchResults searchedResults={searchedResults} />
      </div>
      <NewProducts newProducts= {newProducts} />
     </div>
   )
}

export async function getServerSideProps() {
    
    await mongooseConnection()
    const featuredProductId = '64b06d6f34a44712c93304f0'
    const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 })
    const sliderImage = (await Product.find({}, null,)).slice(5,15)
    const featuredProduct = await Product.findById(featuredProductId)
    return {
      props: {
        featuredProduct: await JSON.parse(JSON.stringify(featuredProduct)),
        newProducts: await JSON.parse(JSON.stringify(newProducts)),
        sliderImage: await JSON.parse(JSON.stringify(sliderImage)),
      }
    }
  }
 
export default Home