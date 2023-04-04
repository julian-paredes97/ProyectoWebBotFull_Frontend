import React, {useState, useEffect, useContext} from 'react'
import CartContext from '../../Context/CartContext'
import Card from '../Card'
import styles from "./styles.module.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'

const tele = window.Telegram.WebApp; //conecta a telegram

var temp;

var count = false; //bandera para saber si ya se selecciono alguna categoria

function Products () {

  /* Traemos del context los productos: */
  const { products } = useContext(CartContext);

  console.log("count:",count)
  if(count === false){
    temp = products;    //carga los productos al inicio
  }

  console.log("productos:",products);

  const [dropdown,setDropdown] = useState(false);

  useEffect(() => {              //conectar a telegram
    tele.ready();                //avisa a la WebApp que ya esta conectado a telegram
    tele.expand();               //Expande la ventana de la WebApp
  });


  const abrirCerrarDropdown = () =>{  //funcion que permite abrir o cerrar el dropdown
    setDropdown(!dropdown);
  }

  const accionTodas =() =>{     //funcion que permite listar todos los productos del catalogo
    temp=products;     //cambia para mostrar todos los productos
    count = true;
  }

  const accionAseo =() =>{
    temp = filteredAseo;        //cambia todos los productos por solo los de aseo
    count = true;
  }

  const accionAldor =() =>{
    temp = filteredAldor;       //cambia todos los productos por solo los de aldor
    count = true;
  }

  const accionFarmacos =() =>{
    temp=filteredFarmacos;     //cambia todos los productos por solo los farmacos
    console.log(temp)
    count = true;
  }

  const accionCuidadoIntimo =() =>{
    temp=filteredCuidadoIntimo;     //cambia todos los productos por solo los de cuidado intimo
    console.log(temp)
    count = true;
  }

  const accionCuidadoPersonal =() =>{
    temp = filteredCuidadoPersonal;         //cambia todos los productos por solo los de cuidado personal
    count = true;
  }

  const accionDetergentes =() =>{
    temp = filteredDetergentes;           //cambia todos los productos por solo los detergentes
    count = true;
  }

  const accionEnlatados =() =>{
    temp = filteredEnlatados;           //cambia todos los productos por solo los enlatados
    count = true;
  }

  const accionTratCapilares =() =>{
    temp = filteredTratCapilares;         //cambia todos los productos por solo los tratamientos capilares
    count = true;
  }

  // Filtros que se van a aplicar:
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
        })}
    </div>
    </>
  )
}

export default Products;