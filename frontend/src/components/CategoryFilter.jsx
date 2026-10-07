const CategoryFilter = ({ category, setCategory, categories }) => {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-3"
    >
      <option value="">All Categories</option>

      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  )
}

export default CategoryFilter