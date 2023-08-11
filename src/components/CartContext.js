import { createContext, useEffect, useState } from "react";
 
export const CartContext = createContext({})

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined"?  window.localStorage :null
  
  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => { 
    if (cartProducts?.length > 0) {
      localStorage.setItem('cart',JSON.stringify(cartProducts))
    }
  }, [cartProducts])
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')))
    }
  }, [])
  
  const clearCart = () => {
    setCartProducts([])
  }
  
  const addProduct = (productId) => {
    setCartProducts(prev => [...prev,productId])
  }
  const removeProduct = (productId) => { 
    setCartProducts(prev => {
      const pos = prev.indexOf(productId)
      if (pos !== -1) {
        return prev.filter((value,index)=> index !== pos)
      }
      return prev
    })
  }

  return (
    <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart,setCartProducts}}>
      {children}
    </CartContext.Provider>
  )
}