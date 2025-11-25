import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import Shoes from "./pages/Shoes.jsx";
import Add from "./pages/Add.jsx";
import Update from "./pages/Update.jsx";
import "./style.css";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Shoes/>}></Route>
        <Route path="/add" element= {<Add/>}></Route>
        <Route path="/update/:id" element= {<Update/>}></Route>
      </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;
