import {createContext, useEffect, useState} from "react";
import axios from "axios";

/* Creamos el context, se le puede pasar un valor inicial */
export const CartContext = createContext();

export const CartProvider = ({children})=>{
    /*const [cartItems, setCartItems] = useState(()=>{
        try {
            const productosEnLocalStorage = localStorage.getItem("cartProducts");
            return productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : [];
        } catch (error) {
            return [];
        }
    });*/

    /* Creamos un estado para el carrito */
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        //const data = await axios.get("http://localhost:5000/api/productos")
        const data = await axios.get("https://e35c-181-234-155-58.ngrok.io/api/productos")   //ngrok
        const products = data.data.productos
        setProducts(products);
        //.then(({ data }) => setProducts(data.products));
        
        //console.log("DATamelo:",data.data.productos);
    };

    useEffect(() => {
      getProducts();
      /*localStorage.setItem('cartProducts', JSON.stringify(cartItems));
      console.log(cartItems)*/
    //}, [cartItems]);
    }, []);


    const addItemToCart =  (product) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.codigo === product.codigo   //era id cambio a .codigo
        );

        if(inCart){
            setCartItems(
                cartItems.map((productInCart)=>{
                    if(productInCart.codigo === product.codigo){                //era id cambio a .codigo
                        return {...inCart, cantidad: inCart.cantidad + 1};      //era amount cambio a cantidad
                    } else return productInCart;
                })
            );
        } else {
            setCartItems([...cartItems, {...product,cantidad: 1}]);               //era amount cambio a cantidad
        }
    };

    const deleteItemToCart = (product) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.codigo === product.codigo            //era id cambio a .codigo
        );

        if(inCart.cantidad===1){                                                   //era amount cambio a cantidad
            setCartItems(
                cartItems.filter((productInCart) => productInCart.codigo !== product.codigo) //era id cambio a .codigo
            );
        }else{
            setCartItems(
                cartItems.map((productInCart)=>{
                if(productInCart.codigo===product.codigo){           //era id cambio a .codigo
                    return {...inCart, cantidad: inCart.cantidad - 1};  //era amount cambio a cantidad
                } else return productInCart;
            }));
        }

        /*if(inCart.amount===1){
            setCartItems((productInCart)=>{
                if(productInCart.id===product.id){
                    return {...inCart, amount: inCart.amount - 1}
                } else return productInCart
            })
        }*/
    };

    return(
        <CartContext.Provider 
        value={{cartItems, products, addItemToCart, deleteItemToCart}}
        >
            {children}
        </CartContext.Provider>
    );
    
};

//export default CartProvider;
export default CartContext;
