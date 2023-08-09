
import styles from '@/styles/Home.module.css'
import { useContext } from 'react'
import { CartContext } from './CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'

const CartCard = ({ products }) => {
  const { cartProducts,addProduct,removeProduct } = useContext(CartContext)
  const productNumber = (id) => {
      addProduct(id)
  }
  const lessProductNumber = (id) => {
    removeProduct(id)
  }

  return (
    <div>
      {products?.length > 0 && (
        <div  className={styles.cartCardBox}>
            {products.map(product => (
              
              <div
                className={styles.cartproducts}
                key={product._id}>
                
                <img
                  src={product.images[0]}
                  style={{
                    height: '120px',
                    borderRadius: '4px',
                    }}
                  alt='' />
                <div className={styles.h4Box}>
                <h4>
                  <FontAwesomeIcon icon={faTag} rotation={90}/>
                  {
                  cartProducts.filter(id=> id===product._id).length * product.price
                  } Ksh
                </h4>
                <h4>
                  <button onClick={()=> lessProductNumber(product._id)}>&minus;</button>
                  {
                  cartProducts.filter(id=> id===product._id).length
                  }
                  <button onClick={()=>productNumber(product._id)}>+</button>
                </h4>
                </div>
              </div>
            ))}
        </div>
        )}
    </div>
  )
}

export default CartCard