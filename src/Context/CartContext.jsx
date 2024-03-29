import {createContext, useEffect, useState} from "react";
import axios from "axios";

//esto es para el bot:

/*const { Telegraf } = require("telegraf");
//const TOKEN = "5153026043:AAEOA6Jgze21I8PGuZWKJoNMGY1Wzl6S5OI";
const TOKEN = "5489576102:AAEppJsThPctLwr4iEp9C5iyGMMdd9JHUXk";
const bot = new Telegraf(TOKEN);*/

const tele = window.Telegram.WebApp; //conectar a telegram

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

    const [showCart,setShowCart] = useState(true);

    //let ident = ""
    


    /*const mostrarBot = async () => {
        const dataBot = await axios.get("https://be9b-186-112-70-194.ngrok.io/api/webhook")   //ngrok

        if (dataBot===true){
            bot.launch();
        }
        bot.launch()

        console.log(dataBot)
    }*/

    /*const fetchData = () => {
        axios.post("https://flask-web-bot-app.loca.lt/botdata").then((res)=>{
            setIdentificacion(res.data.identificacion)
        });
    };*/


    const getProducts = async () => {
        //const data = await axios.get("http://localhost:5000/prod/productos")
        const data = await axios.get("https://flask-web-bot-app.loca.lt/prod/productos")
        
        //const data = await axios.get("https://eb3c-181-234-153-170.ngrok.io/api/productos")   //ngrok
        
        const products = data.data.productos
        setProducts(products);
        //.then(({ data }) => setProducts(data.products));
        
        //console.log("DATamelo:",data.data.productos);
    };

    /*const getIdentificacion = async () => {
        //const ident = await axios.get("https://flask-web-bot-app.loca.lt/botdata")
        const ident = await axios.get("https://flask-web-bot-app.loca.lt/botdata")
        //const identificacion = ident.data.identificacion
        const identificacion = ident.data
        console.log("ident:",ident)
        console.log("identificacion:",identificacion)
        setIdentificacion(identificacion);
    };*/

    //const [data,setData] = useState([{}]);
    const [identificacionUsuario, setIdentificacionUsuario] = useState([{}]);
    const [datosUsuario, setDatosUsuario] = useState([{}]);
    /*const [datosUsuarioUser, setDatosUsuarioUser] = useState([{}]);
    const [datosUsuarioChat, setDatosUsuarioChat] = useState([{}]);*/
    //const [identificacionUsuario, setIdentificacionUsuario] = useState("");
  
    /*useEffect(()=>{
        
    },[])*/


    /* se ejecuta solo una vez cuando se abre el front */
    useEffect(() => {

        let initDataUnsafe = window.Telegram.WebApp.initDataUnsafe.user;
        /*let initUserData = window.Telegram.WebApp.user;
        let initChatData = window.Telegram.WebApp.chat;*/

        setDatosUsuario(initDataUnsafe)
        /*setDatosUsuarioUser(initUserData)
        setDatosUsuarioChat(initChatData)*/
        

        /*fetch("https://flask-web-bot-app.loca.lt/botdata2").then(
        //fetch("/data").then(
        res => res.json()
        ).then(
        //data => {
        identificacionUsuario => {
            setIdentificacionUsuario(identificacionUsuario)
            if (sessionStorage.getItem("identificacionUsuario")!= null){
                console.log("identificacionUsuario ya existe:",identificacionUsuario);    
            }
            else{
                sessionStorage.setItem("identificacionUsuario",identificacionUsuario);
                console.log("identificacionUsuario:",identificacionUsuario);
            }
            
        }
        //    setData(data)
        //    console.log("data:",data)
        //}
        )*/


        getProducts();
        //getIdentificacion();

        //guia:
        //fetch("https://dog.ceo/api/breeds/image/random") // ⬅️ 1) llamada a la API, el resultado es una Promise
        //.then((response) => response.json()) // ⬅️ 2) cuando la petición finalice, transformamos la respuesta a JSON (response.json() también es una Promise)
        //.then((dog) => console.log(dog)); // ⬅️ 3) aquí ya tenemos la respuesta en formato objeto
        //guia
      
        // fetch("https://flask-web-bot-app.loca.lt")
        // .then((response) => response.json())
        // .then(jsonData => ident = jsonData);
        //.then(jsonData => setIdentificacion(jsonData));
            // do something with the data, e.g. setState

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

    const makeOrder = async () => {
        /*Aqui toca meter el post para el back con el pedido completo*/
        //const data = await axios.get("http://localhost:5000/productos/productos").

        //fetchData();

        //await axios.get("https://flask-web-bot-app.loca.lt/botdata").then((res)=>{
        //    setIdentificacion(res.data.identificacion)
        //});

        /* ESTO ESTA bien */ 
        console.log("carritu:",cartItems)
        let carritoTemp = cartItems;
        setCartItems([])

        setShowCart(false);
        
        //let data = await axios.get("https://flask-web-bot-app.loca.lt/botdata2") //esto servia melo
        
        //const data = await axios.get("https://eb3c-181-234-153-170.ngrok.io/api/productos")   //ngrok
        
        //let identificacion = data.data //esto servia melo
        //setProducts(identificacion);//disque products mucha gueva

        let identif = sessionStorage.getItem("identificacionUsuario");

        
        //getIdentificacion();
        console.log("carritu:",cartItems)

        //let carrito=cartItems

        const carrito = {
            ...carritoTemp,
            identif,
            datosUsuario,
            tele
        };

        //const result = await axios.post("http://localhost:5000/pet/recibePedido",cartItems)
        //const result = await axios.post("https://flask-web-bot-app.loca.lt/recibePedido",cartItems)
        /*let flag= true;
        let ready ={
            flag
        };*/
        let result = await axios.post("https://flask-web-bot-app.loca.lt/recibePedido",carrito)
        //let result = await axios.post("https://flask-web-bot-app-jpc97.loca.lt/recibePedido",carrito)
        //let readyFlag = await axios.post("https://flask-web-bot-app.loca.lt/pedidoListo",ready)
        //setShowCart(true);
        tele.close();
        console.log(result.data.data);
        //console.log(readyFlag.data.data);
        
        

        /* ESTO ESTA bien */
        
        return carrito
        //return cartItems
    };

    return(
        <CartContext.Provider 
        value={{cartItems, products, addItemToCart, deleteItemToCart,makeOrder,showCart}}
        >
            {children}
        </CartContext.Provider>
    );
    
};

//export default CartProvider;
export default CartContext;
