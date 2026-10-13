const Product = require('../models/Product')

const getProducts = async (req, res) => {
try {
const { search, category } = req.query


const query = {
  isDeleted: { $ne: true }
}

if (search && search.trim()) {
  const safeSearch = search
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  query.name = {
    $regex: safeSearch,
    $options: 'i'
  }
}

if (category && category.trim()) {
  query.category = category.trim()
}

const products = await Product.find(query)

res.status(200).json({
  success: true,
  count: products.length,
  products
})


} catch (error) {
console.error('Get products error:', error)


res.status(500).json({
  success: false,
  message: 'Failed to fetch products'
})


}
}

const getProductById = async (req, res) => {
try {
const product = await Product.findOne({
_id: req.params.id,
isDeleted: { $ne: true }
})


if (!product) {
  return res.status(404).json({
    success: false,
    message: 'Product not found'
  })
}

res.status(200).json({
  success: true,
  product
})


} catch (error) {
console.error('Get product by ID error:', error)


res.status(500).json({
  success: false,
  message: 'Failed to fetch product'
})


}
}

const createProduct = async (req, res) => {
try {
const product = await Product.create(req.body)


res.status(201).json({
  success: true,
  message: 'Product created successfully',
  product
})


} catch (error) {
console.error('Create product error:', error)


res.status(400).json({
  success: false,
  message: error.message
})


}
}

const updateProduct = async (req, res) => {
try {
const product = await Product.findOneAndUpdate(
{
_id: req.params.id,
isDeleted: { $ne: true }
},
req.body,
{
new: true,
runValidators: true
}
)


if (!product) {
  return res.status(404).json({
    success: false,
    message: 'Product not found'
  })
}

res.status(200).json({
  success: true,
  message: 'Product updated successfully',
  product
})


} catch (error) {
console.error('Update product error:', error)


res.status(400).json({
  success: false,
  message: error.message
})


}
}

const deleteProduct = async (req, res) => {
try {
const product = await Product.findOneAndUpdate(
{
_id: req.params.id,
isDeleted: { $ne: true }
},
{
$set: { isDeleted: true }
},
{
new: true
}
)


if (!product) {
  return res.status(404).json({
    success: false,
    message: 'Product not found'
  })
}

res.status(200).json({
  success: true,
  message: 'Product soft-deleted successfully'
})


} catch (error) {
console.error('Soft delete product error:', error)


res.status(500).json({
  success: false,
  message: 'Failed to delete product'
})


}
}

module.exports = {
getProducts,
getProductById,
createProduct,
updateProduct,
deleteProduct
}
