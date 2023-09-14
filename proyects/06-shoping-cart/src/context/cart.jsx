import { createContext, useState } from "react";

//1. Crear Contexto
export const CartContext = createContext();

//2. Crear provider
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    //Chequear si el producto ya esta en el carrito
    const productInCartIndex = cart.findIndex(item => item.id === product.id)

    if (productInCartIndex >= 0) {
        //structuredClone - hace copia profunda de array y objetos
        const newCart = structuredClone(cart)
        //Incrementamos la cantidad ya que nodificamos la copia
        newCart[productInCartIndex].quantity += 1
        //Actualizamos el nuevo carrito
        return setCart(newCart)
    }

    // producto no esta en el carrito
    setCart(prevState => {[
        ...prevState,
        {
            ...product,
            quantity: 1
        }
    ]})
  };
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
