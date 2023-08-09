import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'
import CartCard from "@/components/cartCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

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

export default function CartPage() {

  const { cartProducts } = useContext(CartContext)
  const[ products,setProducts] = useState([])
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then(response => {
        setProducts(response.data)
      })
    }
  }, [cartProducts])
  
  let total = 0

  for (const productId of cartProducts){
    const price = products.find(p => p._id === productId)?.price || 0
    total += price;
  }

  return (
    <>
      <Header />
        <h3 style={{textAlign:'center'}}>Cart</h3>
      {!cartProducts?.length && (
        <h3 style={{textAlign:'center'}}>Your cart is Empty</h3>
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
              <form>
                <input type="text" placeholder="NAME" />
                <input type="email" placeholder="Email" />
                <div>
                  <input type="text" placeholder="City" />
                  <input type="text" placeholder="Postal Code" />
                </div>
                <input type="text" placeholder="Street Address" />
                <input type="text" placeholder="Country" />
                <button type="submit">Proceed to Payment</button>
              </form>
            </>
          )}
        </div>
      </div>
      <hr style={{
        width: '80%',
        margin: 'auto',
        marginTop: '10px',
        borderWidth: '2px',
        borderRadius:'10px',
        borderImage:'linear-gradient(to right, #fa0588, #f7009a, #f000ae, #e400c4, #d300da, #c400e4, #b200ef, #9b01fa, #8e00fa, #7f00fa, #6e02fa, #5b05fa)20',
      }}></hr>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(to right, #fa0588, #f7009a, #f000ae, #e400c4, #d300da, #c400e4, #b200ef, #9b01fa, #8e00fa, #7f00fa, #6e02fa, #5b05fa)',
          webkitBackgroundClip: 'text',
          mozBackgroundClip: 'text',
          webkitTextFillColor: 'transparent',
          mozTextFillColor:'transparent',
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