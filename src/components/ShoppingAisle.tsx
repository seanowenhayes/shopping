import { Floor } from './Floor'
import { Lighting } from './Lighting'
import { Products } from './Products'

export function ShoppingAisle() {
  return (
    <>
      <Floor />
      <Lighting />
      <Products height={10} length={10} aisles={10}/>
    </>
  )
} 