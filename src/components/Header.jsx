import Link from "next/link"
import styles from '@/styles/Home.module.css'
import { useContext, useState } from "react"
import { CartContext } from "./CartContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faBars, faCartShopping, faSearch,} from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import { mongooseConnection } from "../../lib/mongoose"
import { Product } from "../../models/Product"

const linkStyles = {
    color:'#fff',
    padding:'10px 0',
    textDecoration:'none',
  }
const activePage = {
  color:" #ffff",
  textDecoration: ' none',
  padding:'5px 0',
  borderBottom: "solid 3px #ffff",
}
const cartStyles = {
              position: 'absolute',
              top: -10,
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
            }
const activeCart = {
              color:" #ffff",
              padding:'5px 0',
              textDecoration:' none',
              borderBottom: "solid 3px #ffff",
              position:'relative',
  }

const Header = () => {

  const { cartProducts } = useContext(CartContext)
  const router = useRouter()
  const { pathname } = router
  const [search, setSearch] = useState('')


  const handleSearch = (ev) => {
    if (ev.key === 'Enter') {
      searchTrigger(ev.target.value.trim())
    }
  }

  const handleButtonSearch = () => {
    searchTrigger(search)
  }
  const searchTrigger = async(search) => {
    if (search !== '' ) {
      try {
        const response = await fetch(`/api/search?query=${search}`)
        const searchResults = await response.json()
        console.log({searchResults})
      } catch (err) {
        console.error({err})
      }
    }
  }
  
  
  

  return (
    <header className={styles.header}>
      <Link className={''} style={linkStyles} href={''}>
        <FontAwesomeIcon icon={faBars} style={{marginRight:4,}} />
        NALLA</Link>
      <div className="search-box">
        <input
          className="search"
          type="search" placeholder="search products"
          value={search}
          onKeyDown={handleSearch}
          onChange={(e) => setSearch(e.target.value)} />
        <div className="search-icon">
          <FontAwesomeIcon onClick={handleButtonSearch}   icon={faSearch} />
        </div>
      </div>
      <nav id="nav">
        <Link style={ pathname.includes('/') && pathname==='/' ?activePage :linkStyles} href={'/'}>Home</Link>
        <Link style={pathname.includes('/products')? activePage : linkStyles} href={'/products'}>All Products</Link>
        <Link style={linkStyles} href={'/categories'}>Categories</Link>
        <Link style={linkStyles} href={'/account'}>Account</Link>
       
      </nav>
      <div className="toggle-cart">
        <Link
          style={ pathname === '/cart'? activeCart : {
            position: 'relative',
            color: '#fff',
            textDecoration:'none'
          }}
          href={'/cart'}>Cart <FontAwesomeIcon icon={faCartShopping} style={{fontSize:'20px'}} />
          <span
            style={cartStyles}>
            {cartProducts.length}
          </span>
        </Link>
      </div>
    </header>
  )
}



export default Header