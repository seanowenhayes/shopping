import { useEffect, useState } from 'react'
import { Product } from './Product'

interface FakeStoreProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

function mapProductData(product: FakeStoreProduct, index: number) {
  // Use the API image
  const imageUrl = product.image
  // Use a color based on category or fallback
  const colorMap: Record<string, string> = {
    "men's clothing": '#8B4513',
    "women's clothing": '#DAA520',
    "jewelery": '#bfa46d',
    "electronics": '#2F4F4F',
  }
  const color = colorMap[product.category] || '#bfa46d'
  // Position products in a grid (4 per row)
  const x = (index % 4) * 2 - 3
  const z = Math.floor(index / 4) * 2
  const position: [number, number, number] = [x, 0, z]
  const scale: [number, number, number] = [1, 1, 1]
  return {
    position,
    color,
    imageUrl,
    name: product.title,
    price: `$${product.price}`,
    scale,
  }
}

export function ProductCatalog() {
  const [products, setProducts] = useState<FakeStoreProduct[]>([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  useEffect(() => {
    console.log({products, len: products.length})
  }, [products])

  return (
    <group>
      {products.map((product, i) => (
        <Product key={product.id} {...mapProductData(product, i)} />
      ))}
    </group>
  )
} 