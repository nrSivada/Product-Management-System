import { Link } from "react-router-dom"

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      
      <img
        src={product.image} 
        alt={product.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800">
          {product.name}
        </h2>

        <p className="text-gray-600 mt-2">
          {product.description}
        </p>

        <p className="text-lg font-bold text-gray-900 mt-3">
          ₹{product.price}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Category: {product.category}
        </p>

        <p className="text-sm text-gray-500">
          Stock: {product.stock}
        </p>

       <div className="flex gap-3 mt-5">
  <Link
    to={`/products/${product._id}`}
    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
  >
    Details
  </Link>

  <Link
    to={`/edit/${product._id}`}
    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
    >
    Edit
  </Link>

  <button
    onClick={() => onDelete(product._id)}
    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
  >
    Delete
  </button>
</div>
      </div>

    </div>
  )
}

export default ProductCard