import { ProductCatalog } from './ProductCatalog'

export type ProductsProps = {
  height: number
  length: number
  aisles?: number
}

export const Products = ({ height: _height, length: _length, aisles: _aisles = 1 }: ProductsProps) => {
  return (
    <group>
      <ProductCatalog />
    </group>
  )
} 