import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ProductForm from '../components/ProductForm'
import { getProductById, updateProduct } from '../services/productApi'

const EditProduct = () => {
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
        console.error(error)

        setError(
          error.response?.data?.message ||
          'Failed to fetch product'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await updateProduct(id, updatedProduct)

      navigate('/')
    } catch (error) {
      console.error(error)

      setError(
        error.response?.data?.message ||
        'Failed to update product'
      )
    }
  }

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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Edit Product
      </h1>

      <ProductForm
        initialData={product}
        onSubmit={handleUpdateProduct}
        buttonText="Update Product"
      />
    </div>
  )
}

export default EditProduct