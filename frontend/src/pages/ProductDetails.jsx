import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getProductById } from '../services/productApi'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id)

        setProduct(response.data.product)
      } catch (error) {
        setError(
          error.response?.data?.message || 'Failed to fetch product'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <p className="text-center mt-10">
        Loading product...
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-4">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-5">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mt-2">
            Category: {product.category}
          </p>

          <p className="text-gray-600 mt-1">
            Stock: {product.stock}
          </p>

          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails