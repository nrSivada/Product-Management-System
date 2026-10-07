import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import ProductList from './pages/ProductList'
import AddProduct from './pages/AddProduct'
import ProductDetails from './pages/ProductDetails'
import EditProduct from './pages/EditProduct'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<ProductList />} />

        <Route path="/add" element={<AddProduct />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/edit/:id" element={<EditProduct />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App