import Header from "@/components/Header";
import { mongooseConnection } from "../../lib/mongoose";
import AllProductsBox from "@/components/AllProducts";
import { Toaster } from "react-hot-toast";
import Product from "../../models/Product";

  const heading = {
  backgroundImage: 'linear-gradient(to right bottom, #fa0588, #f7009a, #f000ae, #e400c4, #d300da, #c400e4, #b200ef, #9b01fa, #8e00fa, #7f00fa, #6e02fa, #5b05fa)',
  WebkitBackgroundClip: 'text',
  MozBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor:'transparent',
  backgroundSize: '10%',
  marginTop:'70px',
  textAlign: 'center',
  textTransform:'uppercase',
}

export default function AllProducts({ products }) {
  
  return (
    <>
      <Header />
      <Toaster/>
      <h3 style={heading}>All Products</h3>
      <div
         style={{
              display: 'flex',
              gap: 35,
              flexWrap: 'wrap',
              alignItems:'center',
              justifyContent:'center',
              padding:'10px 20px',
            }}
      >
        {products?.length > 0 && products.map((aps) => (
          <div
            key={aps}>
            <AllProductsBox products={aps} />
          </div>
        ))}
      </div>
    </>
   )
}

export async function getServerSideProps() {
  await mongooseConnection();
  const products = await Product.find({},null, {sort:{'_id':-1}})
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}