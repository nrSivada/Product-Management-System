import { useEffect, useState } from 'react'

const ProductForm = ({
  initialData,
  onSubmit,
  buttonText = 'Add Product'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price ?? '',
        category: initialData.category || '',
        image: initialData.image || '',
        stock: initialData.stock ?? ''
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (formData.price === '') {
      newErrors.price = 'Price is required'
    } else if (Number(formData.price) < 0) {
      newErrors.price = 'Price cannot be negative'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    if (formData.stock === '') {
      newErrors.stock = 'Stock is required'
    } else if (Number(formData.stock) < 0) {
      newErrors.stock = 'Stock cannot be negative'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})

    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-5"
    >

      {/* Name */}
      <div>
        <label className="block font-medium mb-1">
          Product Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Enter product name"
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Enter product description"
          rows="4"
        />

        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description}
          </p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block font-medium mb-1">
          Price
        </label>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Enter price"
        />

        {errors.price && (
          <p className="text-red-500 text-sm mt-1">
            {errors.price}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium mb-1">
          Category
        </label>

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Enter category"
        />

        {errors.category && (
          <p className="text-red-500 text-sm mt-1">
            {errors.category}
          </p>
        )}
      </div>

      {/* Image */}
      <div>
        <label className="block font-medium mb-1">
          Image URL
        </label>

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Enter image URL"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="block font-medium mb-1">
          Stock
        </label>

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Enter stock"
        />

        {errors.stock && (
          <p className="text-red-500 text-sm mt-1">
            {errors.stock}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900"
      >
        {buttonText}
      </button>

    </form>
  )
}

export default ProductForm