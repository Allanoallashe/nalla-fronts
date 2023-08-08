import Link from "next/link"
import styles from '@/styles/Home.module.css'
import { useContext } from "react"
import { CartContext } from "./CartContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faCartShopping } from "@fortawesome/free-solid-svg-icons"

const linkStyles = {
    color:'#fff',
    textDecoration:'none',
  }

const Header = () => {

  const {cartProducts} = useContext(CartContext)

  return (
    <header className={styles.header}>
      <Link style={linkStyles} href={'/'}>Ecommerce</Link>
      <nav>
        <Link style={linkStyles} href={'/'}>Home</Link>
        <Link style={linkStyles} href={'/products'}>All Products</Link>
        <Link style={linkStyles} href={'/categories'}>Categories</Link>
        <Link style={linkStyles} href={'/account'}>Account</Link>
        <Link
          style={ {
            position: 'relative',
            color: '#fff',
            textDecoration:'none'
          }}
          href={'/cart'}>Cart <FontAwesomeIcon icon={faCartShopping} style={{fontSize:'20px'}} />
          <span
            style={{
              position: 'absolute',
              top: -15,
              backgroundColor:'#F9F871',
              color: 'navy',
              display:'flex',
              fontWeight:'bolder',
              right: -10,
              borderRadius:'50%',
              height: '18px',
              width: '18px',
              padding: 1,
              alignItems: 'center',
              justifyContent:'center'
            }}>
            {cartProducts.length}
          </span>
        </Link>
      </nav>
    </header>
  )
}

export default Header