
import styles from '@/styles/Home.module.css'
import { faCartPlus, faMoneyBill1, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const AllProductsBox = ({products}) => {
  const url = '/products/' + products._id;
  const {addProduct } = useContext(CartContext)
  
  
  return (
    <div className={styles.productBox}>
      <Link href={url}>
        <img src={products.images[0]} alt='' />
      </Link>
      <p style={{margin:0}}>{products.title}</p>
      <p style={{margin:0}}><FontAwesomeIcon icon={faTag} rotation={90} /> {products.price} Ksh</p>
      <div className={styles.buttonCont}>
        <button onClick={()=>addProduct(products._id)}><span>Add to Cart <FontAwesomeIcon icon={faCartPlus}/></span></button>
      </div>
    </div>
  )
}

export default AllProductsBox