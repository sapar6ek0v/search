import './App.css';
import {Route, Routes} from "react-router-dom";
import MainInput from "./components/MainInput/MainInput.js";

function App() {

  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<MainInput/>} />
        </Routes>
    </div>
  );
}

export default App;
