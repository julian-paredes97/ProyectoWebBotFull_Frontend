import {createContext, useEffect, useState} from "react";
import axios from "axios";

//esto es para el bot:

/*const { Telegraf } = require("telegraf");
//const TOKEN = "5153026043:AAEOA6Jgze21I8PGuZWKJoNMGY1Wzl6S5OI";
const TOKEN = "5489576102:AAEppJsThPctLwr4iEp9C5iyGMMdd9JHUXk";
const bot = new Telegraf(TOKEN);*/

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


    /*const mostrarBot = async () => {
        const dataBot = await axios.get("https://be9b-186-112-70-194.ngrok.io/api/webhook")   //ngrok

        if (dataBot===true){
            bot.launch();
        }
        bot.launch()

        console.log(dataBot)
    }*/


    const getProducts = async () => {
        const data = await axios.get("http://localhost:5000/productos/productos")
        
        //const data = await axios.get("https://eb3c-181-234-153-170.ngrok.io/api/productos")   //ngrok
        
        const products = data.data.productos
        setProducts(products);
        //.then(({ data }) => setProducts(data.products));
        
        //console.log("DATamelo:",data.data.productos);
    };

    useEffect(() => {
      getProducts();
      //mostrarBot();
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
        //console.log("carrito:",cartItems);
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
        //console.log("carrito:",cartItems);
    };

    const makeOrder = () => {
        console.log("carritu:",cartItems)
        return cartItems
    };

    return(
        <CartContext.Provider 
        value={{cartItems, products, addItemToCart, deleteItemToCart,makeOrder}}
        >
            {children}
        </CartContext.Provider>
    );
    
};

//export default CartProvider;
export default CartContext;
