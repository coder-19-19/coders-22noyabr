import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/login/index.jsx";
import Home from "./pages/home/index.jsx";
function App() {
   return (
       <BrowserRouter>
          <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/login" element={<Login/>}/>
          </Routes>
       </BrowserRouter>
   )
}

export default App;
