import ProductTable from "@/components/products/ProductsTable"
import ProductsPagination from "@/components/products/ProductsPagination"
import Heading from "@/components/ui/Heading"
import {prisma} from "@/src/lib/prisma"

async function ProductCount() {
  return await prisma.product.count()
}
async function getProucts(page: number , pageZise : number){
  const skip = (page-1) * pageZise
  const products = await prisma.product.findMany({
    take: pageZise,
    skip,
    include:{
      category: true
    } 
    })

  return products
}

export type ProductWithCategory = Awaited <ReturnType <typeof getProucts>>

export default async function ProductsPage({searchParams} : {searchParams: {page:string}}) {

 const page = +searchParams.page || 1
 const pageZise = 10
 
  const productsData =  getProucts(page , pageZise)
  const totalProductsData = ProductCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  console.log(totalProducts)
  return (
    <>
    <Heading>Administrar Productos</Heading>

    <ProductTable
     products={products}
    />

    <ProductsPagination
    page={page}
    />
    
    </>
  )
}
