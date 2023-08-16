import { set } from "mongoose";
import { useState, useContext, createContext, Children, useEffect } from "react";


const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        let existingCartitem = localStorage.getItem('cart')
        if (existingCartitem) setCart(JSON.parse(existingCartitem))
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)

export {useCart, CartProvider}