//import React, {useContext, useState} from 'react'
//import React, {useEffect, useRef, useState} from 'react'
import React, {useState, useEffect, useContext} from 'react'
//import {productsData} from '../../Data/ProductsData'
import  CartContext from '../../Context/CartContext'
import Card from '../Card'
import styles from "./styles.module.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'

//var temp = productsData;

const tele = window.Telegram.WebApp; //conectar a telegram

var temp;

var count = false;

function Products () {
  /* Traemos del context la funcion para agregar un producto */
  /*const { addItemToCart } = useContext(CartContext);*/

  /* Traemos del context la funcion para agregar un producto */
  const { products } = useContext(CartContext);


  if(count === false){
    temp = products;
    count=true;
  }

  //temp = products;

  console.log("chupamelooo",products);

  const [dropdown,setDropdown] = useState(false);

  useEffect(() => {              //conectar a telegram
    tele.ready();
  });

/*
  useEffect(() => {
    
    document.addEventListener('click',clickAfuera,true);
  
  }, []);

  const btnRef = useRef();

  const clickAfuera = (e) =>{
    //console.log(e);
    if(e.path[0] === btnRef.current){
      //!btnRef.current.contains(e.target)){
      console.log("click afuera");
    }else{
      console.log("click adentro");
    }
  }
  */
  
/*  useEffect(effect: () =>{

    const cerrarDropdown = e =>{
      if(e.path[0].tagname !== "button"){
        setDropdown(value:false);
      }
    };


    document.body.addEventListener('click',cerrarDropdown);

    return () => document.body.removeEventListener('click',cerrarDropdown);
  }, deps:[]);
*/
  //var temp = productsData;

  const abrirCerrarDropdown = () =>{
    setDropdown(!dropdown);
  }

  //var Aseo=0;

  const accionTodas =() =>{
    //alert("soy la accion 1");
    //Aseo = Aseo + 1;
    //console.log(Aseo)
    temp=products;     //cambia para mostrar todos los productos
    //console.log(temp)
    //console.log("aber:")
    //console.log(cartItems)
  }

  const accionAseo =() =>{
    temp = filteredAseo;
  }

  const accionAldor =() =>{
    temp = filteredAldor;
  }

  const accionFarmacos =() =>{
    //alert("soy la accion 1");
    //Aseo = Aseo + 1;
    //console.log(Aseo)
    temp=filteredFarmacos;     //cambia todos los productos por solo los de aseo
    console.log(temp)
    //console.log(temp)
    //console.log("aber:")
    //console.log(cartItems)
  }

  const accionCuidadoIntimo =() =>{
    //alert("soy la accion 1");
    //Aseo = Aseo + 1;
    //console.log(Aseo)
    temp=filteredCuidadoIntimo;     //cambia todos los productos por solo los de aseo
    console.log(temp)
    //console.log(temp)
    //console.log("aber:")
    //console.log(cartItems)
  }

  const accionCuidadoPersonal =() =>{
    temp = filteredCuidadoPersonal;
  }

  const accionDetergentes =() =>{
    temp = filteredDetergentes;
  }

  const accionEnlatados =() =>{
    temp = filteredEnlatados;
  }

  const accionTratCapilares =() =>{
    temp = filteredTratCapilares;
  }

  // Find multiple objects that satisfy condition
  const filteredAseo = products.filter(obj => {
    return obj.categoria ==='GLOBOVENTAS (COLGATE)';
  });

  const filteredAldor = products.filter(obj => {
    return obj.categoria ==='COMESTIBLES ALDOR';
  });

  const filteredFarmacos = products.filter(obj => {
    return obj.categoria === 'FARMACOS';
  });

  const filteredCuidadoIntimo = products.filter(obj => {
    return obj.categoria === 'CUIDADO INTIMO';
  });

  const filteredCuidadoPersonal = products.filter(obj => {
    return obj.categoria === 'CUIDADO PERSONAL';
  });

  const filteredDetergentes = products.filter(obj => {
    return obj.categoria === 'DETERGENTES';
  });

  const filteredEnlatados = products.filter(obj => {
    return obj.categoria === 'ENLATADOS';
  });

  const filteredTratCapilares = products.filter(obj => {
    return obj.categoria === 'TRATAMIENTOS CAPILARES';
  });

  return (
    <>

    <Dropdown /*ref={btnRef}*/ isOpen={dropdown} toggle={abrirCerrarDropdown}>
        <DropdownToggle caret className="botonDropdown">
          Categorias
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={()=>accionTodas()}> Todas </DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={()=>accionAseo()}> Aseo </DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={()=>accionAldor()}> Comestibles Aldor </DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={()=>accionCuidadoIntimo()}> Cuidado Intimo </DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={()=>accionCuidadoPersonal()}> Cuidado Personal </DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={()=>accionDetergentes()}> Detergentes </DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={()=>accionEnlatados()}> Enlatados </DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={()=>accionFarmacos()}> Farmacos </DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={()=>accionTratCapilares()}> Tratamientos capilares </DropdownItem>
        </DropdownMenu>
      </Dropdown>


    <div className={styles.cards__container}>
      {temp.map((product,codigo)=>{
        return (
            <Card food={product} key={codigo} /*onAdd={onAdd} onRemove={onRemove}*/ />
          );
        /*<div key={i} className={styles.card}>
          <img src={product.img} alt={product.name} />
          <div>
            <p>
              {product.name} - ${product.price}
            </p>
          </div>
          <button onClick={()=> addItemToCart(product)}>Agregar al carrito</button>
        </div>*/
        })}
    </div>
    </>
  )
}

export default Products;