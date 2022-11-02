import React, {useContext} from "react";
//import React, { useState ,useContext} from "react";
//import "./Card.css";
import { CartContext} from '../../Context/CartContext'
import styles from "./styles.module.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from "../Button/Button";

function Card({ food/*, onAdd, onRemove */}) {
  /*const [count, setCount] = useState(0);*/
  /* Traemos del context la funcion para agregar un producto */
  const { addItemToCart } = useContext(CartContext);
  //const { id, price, amount, name, img ,category } = food;
  const { codigo,categoria,descripcion, precio, cantidad, imagen } = food;

  /*const handleIncrement = () => {
    setCount(count + 1);
    onAdd(food);
  };
  const handleDecrement = () => {
    setCount(count - 1);
    onRemove(food);
  };*/

  return (
    <div className="card">
      <div key={codigo} className={styles.card}>
          <img src={imagen} alt={descripcion} className={styles.image__container}  />
          <div>
            <p className={styles.p1}>
              {descripcion}
            </p>
            <p className={styles.p2}>
              ${precio}
            </p>
          </div>
          <button className={styles.button} onClick={()=> addItemToCart(food)}>Agregar al carrito</button>
        </div>
    </div>
  );

/*<p className={styles.p}>
              {name} - ${price}
            </p>*/

}

export default Card;
