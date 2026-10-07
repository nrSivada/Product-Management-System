import { useEffect, useState } from 'react'

import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'

import {
  getProducts,
  deleteProduct
} from '../services/productApi'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const fetchProducts = async () => {
    try {
      setLoading(true)

      const response = await getProducts()

      setProducts(response.data.products)
    } catch (error) {
      setError('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product._id !== id
        )
      )
    } catch (error) {
      setError('Failed to delete product')
    }
  }

  const categories = [
    ...new Set(
      products.map((product) => product.category)
    )
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === '' || product.category === category

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg">
        Loading products...
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600">
        {error}
      </p>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <CategoryFilter
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList