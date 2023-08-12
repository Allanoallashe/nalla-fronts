import styles from '@/styles/Home.module.css'
import { faCartPlus, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { CartContext } from './CartContext'
 
  const heading = {
  color:'#fa9702',
  textAlign: 'justify',
}

const SingleProduct = ({ product }) => {
  
  const [activeImage, setActiveImage] = useState(product?.images[0])
  const {addProduct} = useContext(CartContext)

  const images = product.images
 

  return (
    <>
      <div
        className={styles.singlesBox}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap:'wrap',
          columnGap: 30,
          padding:'10px 36px'
        }}
      >
        <div className={styles.singleProduct}>
          <div>
            <img height={300} src={activeImage} alt='singles' />
          </div>

          <div
            style={{
              display: 'flex',
              gap:8,
            }}
          >
              {
                images.map(image=>(
                <img
                  key={image._id}
                  src={image}
                  height={60}
                  onClick={() => {
                  setActiveImage(image)
                  }}
                  alt='all' />
                  ))
                }
            </div>
         </div>
          <div className={styles.descriptions}>
            <h2 style={heading}>{ product.title }</h2>
            <h4 >{product.description}</h4>
            <div
              style={{
                display: 'flex',
                alignItems:'center',
                justifyContent:'center',
                gap:30,
                color:'#fa9702',
                whiteSpace:'nowrap',
              }}
            >
            <h3> <FontAwesomeIcon icon={faTag} rotation={90} /> { product.price } Ksh</h3>
              <div className={styles.buttonCont2}>
                <button onClick={()=>addProduct(product._id)}><span>Add to Cart <FontAwesomeIcon icon={faCartPlus}/></span></button>
              </div>
            </div>
          </div>
          
        </div>
   
    </>
   )
}
 
export default SingleProduct