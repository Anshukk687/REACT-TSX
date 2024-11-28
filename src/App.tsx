import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Login from './login';
import Register from './register';
import AddProduct from './addProduct';
import UpdateProduct from './updateProduct';
import Protected from './protected';
import ProductList from './productList';
import SearchProduct from './searchProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Protected element={AddProduct} />} />
          <Route path="/update/:id" element={<Protected element={UpdateProduct} />} />
          <Route path="/" element={<Protected element={ProductList} />} />
          <Route path="/search" element={<Protected element={SearchProduct} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
