import ProductBox from "./ProductBox"
import styles from '@/styles/Home.module.css'



const NewProducts = ({newProducts}) => {
  return (
    <>
      <h2 style={{textAlign:'center'}}>New Arrivals</h2>
    <div className={styles.newProduct}>
      {newProducts?.length >0 &&  newProducts.map(product => (
        <div key={product._id}>
          <ProductBox {...product} />
        </div>
      ))}
    </div>
    </>
  )
}

export default NewProducts