import ProductTable from "@/components/products/ProductsTable"
import Heading from "@/components/ui/Heading"
import { products } from "@/prisma/data/products"
import {prisma} from "@/src/lib/prisma"

async function getProucts(){
  const products = await prisma.product.findMany()

  return products
}


export default async function ProductsPage() {
 
  const products = await getProucts()
 
  return (
    <>
    <Heading>Administrar Productos</Heading>

    <ProductTable
     products={products}
    />
    
    </>
  )
}
