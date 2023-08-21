import Link from "next/link"
import styles from '@/styles/Home.module.css'
import { useContext, useEffect, useState } from "react"
import { CartContext } from "./CartContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faBars, faCartShopping, faSearch,} from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import AutoComplete from "./AutoComplete"

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

const Header = ({setSearchedResults}) => {

  const { cartProducts } = useContext(CartContext)
  const router = useRouter()
  const { pathname } = router

  const [search, setSearch] = useState('')
  const [autoComplete, setAutoComplete] = useState([])
  
  const fetchAutoCompleteOptions = async (value) => {


    if (value !== '') {
      try {
        const response = await fetch(`/api/autocomplete?query=${value}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          console.error('Network response was not ok')
        }

        const options = await response.json()
        
        const sortedOptions = options.sort((a, b) => {
          const lowerCaseValue = value.toLowerCase()
          const lowerCaseA = a.toLowerCase()
          const lowerCaseB = b.toLowerCase()

          if (lowerCaseA.startsWith(lowerCaseValue) && !lowerCaseB.startsWith(lowerCaseValue)) {
            return -1
          }
          if (!lowerCaseA.startsWith(lowerCaseValue) && lowerCaseB.startsWith(lowerCaseValue)) {
            return 1
          }
          return 0
        })

          setAutoComplete(sortedOptions)
      } catch (err) {
        console.error({ err })
      }
    } else {
      setAutoComplete([])
    }
  }


  const handleSearch = (ev) => {
    if (ev.key === 'Enter') {
      searchTrigger(search)
    }
  }

  const handleButtonSearch = () => {
    searchTrigger(search)
  }
  const searchTrigger = async(search) => {
    if (search !== '' ) {
      try {
        const response = await fetch(`/api/search?query=${search}`)

        const results = await response.json()
        console.log({results})
        setSearchedResults(results)
      } catch (err) {
        console.error({err})
      }
    }
  }

  const handleInputChange = (ev) => {
    const value = ev.target.value
    setSearch(value)
    fetchAutoCompleteOptions(value)
  }

  const handleOptionClick = (option) => {
    setSearch(option)
    setAutoComplete([])
  }

  useEffect(() => {
    fetchAutoCompleteOptions(search)
  },[search])
  
  
  

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
          onChange={handleInputChange}
          list="auto-options"
        />
        <div className="search-icon">
          <FontAwesomeIcon onClick={handleButtonSearch}   icon={faSearch} />
        </div>
        {autoComplete?.length > 0 && (
          <AutoComplete options={autoComplete} handleOptionClick={handleOptionClick} />
        )}
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