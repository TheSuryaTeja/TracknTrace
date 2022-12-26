import './App.css';
import { useContext } from "react";
import AuthContext from "./context/AuthProvider";

import Login from "./components/Login"
import Home from "./pages/home/Home";
import Producer from "./pages/producer/Producer"
import Supplier from "./pages/supplier/Supplier"
import Retailer from "./pages/retailer/Retailer"
import Wholesaler from "./pages/wholesaler/Wholesaler"


function App() {
  const { page, setPage } = useContext(AuthContext);

  let Component = Home;
  switch (page) {
    case "home":
      Component = Home;
      break;
    case "producer":
      Component = Producer;
      break;
    case "supplier":
      Component = Supplier;
      break;
    case "retailer":
      Component = Retailer;
      break;
    case "wholesaler":
      Component = Wholesaler;
      break;
    default:
  }

  return (
    <div className="App"> 
      <header className="App-header">
        <Login />
      {<Component setPage={setPage} />}
      </header>
    </div>
  );
}

export default App;
