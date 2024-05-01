import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/login/index.jsx";
import Categories from "./pages/categories/index.jsx";
function App() {
   return (
       <BrowserRouter>
          <Routes>
             <Route path="/login" element={<Login/>}/>
             <Route path="/categories" element={<Categories/>}/>
          </Routes>
       </BrowserRouter>
   )
}

export default App;
