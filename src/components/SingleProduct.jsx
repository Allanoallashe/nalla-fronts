import styles from '@/styles/Home.module.css'
import { useState } from 'react'
 
  const heading = {
  backgroundImage: 'linear-gradient(to right bottom, #fa0588, #f7009a, #f000ae, #e400c4, #d300da, #c400e4, #b200ef, #9b01fa, #8e00fa, #7f00fa, #6e02fa, #5b05fa)',
  WebkitBackgroundClip: 'text',
  MozBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor:'transparent',
  backgroundSize: '10%',
  textAlign: 'justify',
}

const SingleProduct = ({ product }) => {
  
  const [activeImage, setActiveImage] = useState(product?.images[0])

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
          <div className={styles.imageCont}>
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
                  src={image}
                  height={50}
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
          </div>
        </div>
   
    </>
   )
}
 
export default SingleProduct