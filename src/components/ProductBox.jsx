
import styles from '@/styles/Home.module.css'
import { faCartPlus, faMoneyBill1, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';
import { useContext, useRef, useState } from 'react';
import { CartContext } from './CartContext';
import anime from 'animejs';

const ProductBox = ({ _id, title, description, price, images }) => {
  const url = '/products/' + _id;
  const {addProduct } = useContext(CartContext)
  
  const [isAnimated, setIsAnimated] = useState(false)
  const itemRef = useRef(null)
  const copyRef = useRef(null)

  const flyProduct = () => {
    const item = itemRef.current
    const itemCopy = item.cloneNode(true)

    const boundingRect = item.getBoundingClientRect()

    itemCopy.style.position = 'fixed';
    itemCopy.style.left = `${boundingRect.left}px`;
    itemCopy.style.top = `${boundingRect.top}px`;

    itemCopy.style.opacity = 0.85
    itemCopy.style.zIndex = 1000
    itemCopy.style.height = '230px'
    itemCopy.style.borderRadius = '10px'
    itemCopy.style.backdropFilter = 'blur(5px)'
    document.body.appendChild(itemCopy);
    const targetX = window.innerWidth - item.offsetWidth + 65
    const targetY = -70
    setIsAnimated(true)
      anime({
        targets: itemCopy,
        translateX: targetX - boundingRect.left,
        translateY: targetY - boundingRect.top -15,
        opacity: 0.5,
        borderRadius: '20px',
        scale: 0.25,
        duration: 600,
        rotate:'2turn',
        easing: 'easeOutQuad',
        complete: () => {
          setTimeout(() => {
            anime({
              targets: itemCopy,
              opacity: 0,
              duration: 500,
              scale: 0.1,
              rotate:'5turn',
              borderRadius:'50%',
              easing: 'easeOutQuad',
              complete: () => {
                document.body.removeChild(itemCopy);
                setIsAnimated(false)
              },
            })
          },800)
        },
      })
    
  }
  
  return (
    <div className={styles.productBox}>
      <div style={{ position: 'relative', }}>
        <Link style={{ position: 'relative', }} href={url}>
          
          {isAnimated && (<img style={{ position: 'absolute',}} ref={copyRef} src={images[0]} alt='' />)}
          
        <img  ref={itemRef} src={images[0]} alt='' />
        </Link>
      </div>
      <p style={{margin:0}}>{title}</p>
      <p style={{margin:0}}><FontAwesomeIcon icon={faTag} rotation={90} /> {price} Ksh</p>
      <div className={styles.buttonCont}>
        <button onClick={() => {
          addProduct(_id)
          flyProduct()
        }}><span>Add to Cart <FontAwesomeIcon icon={faCartPlus} /></span></button>
      </div>
    </div>
  )
}

export default ProductBox