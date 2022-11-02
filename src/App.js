import Home from "./Components/Home";
import {CartProvider} from "./Context/CartContext";

import "./App.scss";

const App = () => {
  /* Envolvemos la home con el provider del context */
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
};

export default App;