import { redirect } from "next/navigation"
import ProductTable from "@/components/products/ProductsTable"
import ProductsPagination from "@/components/products/ProductsPagination"
import Heading from "@/components/ui/Heading"
import {prisma} from "@/src/lib/prisma"
import Link from "next/link"
import ProductsSearchForm from "@/components/products/ProductsSearchForm"

async function ProductCount() {
  return await prisma.product.count();
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
 
 if(page < 0) redirect('/admin/products')

  const productsData =  getProucts(page , pageZise)
  const totalProductsData = ProductCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageZise)

  
  if(page > totalPages) redirect('/admin/products')
  
  return (
    <>
    <Heading>Administrar Productos</Heading>

    <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
     <Link
     href={'/admin/products/new'}
     className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center
     font-bold cursor-pointer'
     >Crear Producto</Link>

     <ProductsSearchForm/>

    </div>

    <ProductTable
     products={products}
    />

    <ProductsPagination
    page={page}
    totalPages={totalPages}
    />
    
    </>
  )
}
