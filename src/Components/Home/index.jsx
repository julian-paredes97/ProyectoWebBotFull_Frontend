import React, { useState , useContext} from 'react'
import Cart from '../Cart/index'
import FullPageLoader from '../Loader'
import Products from '../Products/index'
import styles from "./styles.module.scss"
import {CartContext} from "../../Context/CartContext"

const Home = () => {

  const { showCart } = useContext(CartContext);

  console.log("aber:",showCart)


  if(showCart===true){
    return (
      <div className={styles.home}>
          <Cart/>
          <Products/>
      </div>
    )
  }
  if(showCart===false){
    return (
      <div className={styles.home}>
          <FullPageLoader/>
      </div>
    )
  }
  
}

export default Home