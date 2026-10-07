import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-xl font-bold"
        >
          Product Management System
        </Link>

        <Link
          to="/add"
          className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Add Product
        </Link>

      </div>
    </nav>
  )
}

export default Navbar