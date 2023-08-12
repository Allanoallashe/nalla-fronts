import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'
import CartCard from "@/components/cartCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import  { Toaster } from 'react-hot-toast';


const heading = {
  backgroundImage: 'linear-gradient(to right top, #f5f4eb, #f1f3c3, #e4f39d, #cef578, #aff752, #a8f841, #a1fa2c, #99fb00, #b3fb00, #cbfb00, #e1fb00, #f6fa02)',
  webkitBackgroundClip: 'text',
  mozBackgroundClip: 'text',
  webkitTextFillColor: 'transparent',
  mozTextFillColor:'transparent',
  backgroundSize: '10%',
  textAlign: 'center',
  textTransform:'uppercase',
}
const horizontal = {
        width: '80%',
        margin: 'auto',
        marginTop: '20px',
        borderWidth: '2px',
        borderRadius:'10px',
        borderImage:'linear-gradient(to right, #fa0588, #f7009a, #f000ae, #e400c4, #d300da, #c400e4, #b200ef, #9b01fa, #8e00fa, #7f00fa, #6e02fa, #5b05fa)20',
}

export default function CartPage() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [city,setCity] = useState('')
  const [postCode,setPostCode] = useState('')
  const [streetAddress,setStreetAddress] = useState('')
  const [country, setCountry] = useState('')
  const [successful, setSuccessful] = useState(false)
  


  const { cartProducts,clearCart,} = useContext(CartContext)
  const[ products,setProducts] = useState([])
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then(response => {
        setProducts(response.data)
      })
    }
    else {
        setProducts([])
      }
  }, [cartProducts])

 
  useEffect(() => {
    if (window.location.href.includes('success')) {
    setProducts([])
    setSuccessful(true)
    clearCart()
  }
  },[])
  
  let total = 0

  for (const productId of cartProducts){
    const price = products.find(p => p._id === productId)?.price || 0
    total += price;
  }
  const goToPayment = async (ev) => {
    ev.preventDefault();
    const res = await axios.post('/api/checkout', {
      name, email, city, postCode, streetAddress, country,
      cartProducts,
    })
    if (res.data.url) {
      window.location = res.data.url
    }
  }
 
  if (successful) {
    return (
      <>
        <Header />
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <h2>Successful Payments</h2>
          <h4>Check your email in two days time</h4>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <Toaster/>
      <h3 className={styles.h3Cart}>Cart</h3>
      {!cartProducts?.length && (
        <h3 className={styles.h3Cart}style={{margin:0,marginBottom:16,}}>Your cart is Empty!</h3>
      )}


      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
        padding: '0 20px',
        flexWrap: 'wrap',
      }}>
        {products?.length > 0 && (
        <div>
            <CartCard products={ products} />
        </div>
        )}
        <div className={styles.orderInfo}>
          {!!cartProducts?.length && (
            <>
              <h3
                style={heading}
              >Order informations</h3>
              <form onSubmit={goToPayment}>
                <input
                  value={name}
                  name="name"
                  type="text"
                  placeholder="NAME"
                  onChange={(ev) => {
                    setName(ev.target.value)
                  }}
                />
                <input onChange={(ev)=>{setEmail(ev.target.value)}} value={email} name="email" type="email" placeholder="Email" />
                <div>
                  <input onChange={(ev)=>{setCity(ev.target.value)}} value={city} name="city" type="text" placeholder="City" />
                  <input onChange={(ev)=>{setPostCode(ev.target.value)}} value={postCode} name="postCode" type="text" placeholder="Postal Code" />
                </div>
                <input onChange={(ev)=>{setStreetAddress(ev.target.value)}} name="streetAddress" value={streetAddress} type="text" placeholder="Street Address" />
                <input name="country" onChange={(ev) => { setCountry(ev.target.value) }} value={country} type="text" placeholder="Country" />
                <button type="submit">Proceed to Payment</button>
              </form>
            </>
          )}
        </div>
      </div>
      <hr style={horizontal}></hr>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(to right, #fa0588, #f7009a, #f000ae, #e400c4, #d300da, #c400e4, #b200ef, #9b01fa, #8e00fa, #7f00fa, #6e02fa, #5b05fa)',
          WebkitBackgroundClip: 'text',
          MozBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          MozTextFillColor:'transparent',
          backgroundSize: '20px',
        }}
      >
        <h3>total :
          &nbsp;
          <FontAwesomeIcon
          icon={faTag}
          rotation={90} 
          style={{color:'#c400e4',
          }}
          />&nbsp;
          {total}Ksh
        </h3>
      </div>
    </>
   )
 }