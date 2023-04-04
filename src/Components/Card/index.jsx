import React, {useContext} from "react";
import { CartContext} from '../../Context/CartContext'
import styles from "./styles.module.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

function Card({ food/*, onAdd, onRemove */}) {
  /* Traemos del context la funcion para agregar un producto */
  const { addItemToCart } = useContext(CartContext);

  const { codigo,categoria,descripcion, precio, cantidad, imagen } = food;


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

}

export default Card;
