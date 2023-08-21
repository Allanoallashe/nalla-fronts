import Header from "@/components/Header";
import { mongooseConnection } from "../../lib/mongoose";
import AllProductsBox from "@/components/AllProducts";
import { Toaster } from "react-hot-toast";
import Product from "../../models/Product";
import SearchResults from "@/components/SearchResults";
import { useRef, useState } from "react";

 const heading = {
  backgroundImage: 'linear-gradient(to right bottom, #fa0588, #f7009a, #f000ae, #e400c4, #d300da, #c400e4, #b200ef, #9b01fa, #8e00fa, #7f00fa, #6e02fa, #5b05fa)',
  WebkitBackgroundClip: 'text',
  MozBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor:'transparent',
  backgroundSize: '10%',
  marginTop:'80px',
  textAlign: 'center',
  textTransform:'uppercase',
}
 const headingWithSearch = {
  backgroundImage: 'linear-gradient(to right bottom, #fa0588, #f7009a, #f000ae, #e400c4, #d300da, #c400e4, #b200ef, #9b01fa, #8e00fa, #7f00fa, #6e02fa, #5b05fa)',
  WebkitBackgroundClip: 'text',
  MozBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor:'transparent',
  backgroundSize: '10%',
  marginTop:'30px',
  textAlign: 'center',
  textTransform:'uppercase',
}

export default function AllProducts({ products }) {

  const [searchedResults, setSearchedResults] = useState([])
  const searchRef = useRef(null)
  
   const searchTrigger = async (search) => {
    if (search !== '') {
      try {
        const response = await fetch(`/api/search?query=${search}`);
        const results = await response.json();
        setSearchedResults(results);

        // Scroll to the search results
        if (searchedResults?.length > 0) {
          searchRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (err) {
        console.error({ err });
      }
    }
     if (searchedResults?.length === 0) {
       return; 
     }
  };
  
  return (
    <>
      <Header setSearchedResults={setSearchedResults} searchTrigger={ searchTrigger} />
      <Toaster/>
      <div
        style={{marginTop:'50px'}}
        ref={searchRef}>
        
          <SearchResults  searchedResults={searchedResults} />
        
      </div>
      <h3 style={searchedResults?.length > 0 ? headingWithSearch : heading}>All Products</h3>
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
            key={aps._id}>
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