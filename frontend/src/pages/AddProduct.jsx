import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ProductForm from '../components/ProductForm'
import { addProduct } from '../services/productApi'

const AddProduct = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleAddProduct = async (product) => {
    try {
      await addProduct(product)

      navigate('/')
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to add product'
      )
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Add Product
      </h1>

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      <ProductForm
        onSubmit={handleAddProduct}
        buttonText="Add Product"
      />

    </div>
  )
}

export default AddProduct