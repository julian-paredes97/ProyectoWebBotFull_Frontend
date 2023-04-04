import {createContext, useEffect, useState} from "react";
import axios from "axios";

const tele = window.Telegram.WebApp; //Permite conectarse a telegram

/* Se crea el contexto que usara el front: */
export const CartContext = createContext();

export const CartProvider = ({children})=>{

    //Constantes para almacenar los items en el carrito, los datos del usuario
    //y los productos de la BD:
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [datosUsuario, setDatosUsuario] = useState([{}]);
    /* Se crea un estado para saber cuando mostrar el carrito: */
    const [showCart,setShowCart] = useState(true);

    /* Funcion que permite traer los productos del backend y almacenarlos en la const products:*/
    const getProducts = async () => {
        const data = await axios.get("https://flask-web-bot-app.loca.lt/prod/productos")
        const products = data.data.productos
        setProducts(products);
    };


    /* hook que se ejecuta solo una vez cuando se abre el front */
    useEffect(() => {
        /* Trae datos del usuario desde la WebApp de Telegram */
        let initDataUnsafe = window.Telegram.WebApp.initDataUnsafe.user;
        setDatosUsuario(initDataUnsafe);
        getProducts();

    }, []);

    /* Funcion que permite añadir un producto al carrito de compras */
    const addItemToCart =  (product) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.codigo === product.codigo
        );

        if(inCart){
            setCartItems(
                cartItems.map((productInCart)=>{
                    if(productInCart.codigo === product.codigo){                
                        return {...inCart, cantidad: inCart.cantidad + 1};      
                    } else return productInCart;
                })
            );
        } else {
            setCartItems([...cartItems, {...product,cantidad: 1}]);               
        }
    };

    /* Funcion que permite eliminar un producto del carrito de compras */
    const deleteItemToCart = (product) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.codigo === product.codigo            
        );

        if(inCart.cantidad===1){                                                   
            setCartItems(
                cartItems.filter((productInCart) => productInCart.codigo !== product.codigo) 
            );
        }else{
            setCartItems(
                cartItems.map((productInCart)=>{
                if(productInCart.codigo===product.codigo){           
                    return {...inCart, cantidad: inCart.cantidad - 1};  
                } else return productInCart;
            }));
        }
    };

    /* Funcion que permite enviar los datos del pedido completo al backend: */
    const makeOrder = async () => {

        console.log("carrito:",cartItems)
        let carritoTemp = cartItems;
        setCartItems([]) //se vacea el carrito
        /* se cierra y se deja de mostrar el carrito: */
        setShowCart(false);
        
        console.log("carrito:",cartItems)
        
        // Se prepara el objeto que se enviara al back con los productos en el carrito
        //y los datos del usuario correspondiente:
        const carrito = {
            ...carritoTemp,
            datosUsuario
        };
        
        let result = await axios.post("https://flask-web-bot-app.loca.lt/recibePedido",carrito)     //POST al backend
        tele.close();  //se cierra la ventana de la WebApp de Telegram
        console.log(result.data.data);
        
        return carrito
    };

    return(     //se retornan los elementos que se compartiran por medio del context y el provider
        <CartContext.Provider 
        value={{cartItems, products, addItemToCart, deleteItemToCart,makeOrder,showCart}}
        >
            {children}
        </CartContext.Provider>
    );
    
};

export default CartContext;
