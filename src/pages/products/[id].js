import Header from "@/components/Header";
import { mongooseConnection } from "../../../lib/mongoose";
import SingleProduct from "@/components/SingleProduct";
import { Toaster } from "react-hot-toast";
import Product from "../../../models/Product";

export default function ProductPage({ product }) {
  
  return (
    <>
      <Header />
      <Toaster/>
      <div
        style={{marginTop:'80px', textAlign:'center'}}
      >
        <SingleProduct product={product} />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  await mongooseConnection();
  const {id} = context.query
  const product = await Product.findById(id)
  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    }
  }
}