import React, { useContext } from "react";
import {CartContext} from "../../Context/CartContext";
import styles from "./styles.module.scss";

export const ItemCart = ({ item }) => {
  /* Traemos del context las funciones para agregar y sacar productos del carrito */
  const { deleteItemToCart, addItemToCart } = useContext(CartContext);

  /* Desestructuramos el item para sacar solo la id */
  //const { id } = item;

  return (
    <div className={styles.cartItem}>
      <img src={item.imagen} alt={item.descripcion} className={styles.image__container}/>
      <div className={styles.dataContainer}>
        <div className={styles.left}>
          <p>{item.descripcion}</p>
          <div className={styles.buttons}>
            <button onClick={() => addItemToCart(item)}>AGREGAR</button>
            <button onClick={() => deleteItemToCart(item)}>SACAR</button>
          </div>
        </div>
        <div className={styles.right}>
          <div>{item.cantidad}</div>
          <p>Total: ${item.cantidad * item.precio}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;