/*import { useEffect,useState } from "react";*/
import Home from "./Components/Home";
import {CartProvider} from "./Context/CartContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.scss";

const App = () => {
  /* Envolvemos la home con el provider del context */
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;