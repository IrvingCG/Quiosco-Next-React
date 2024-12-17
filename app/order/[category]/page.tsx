import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

// Función para obtener los productos de una categoría
async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

// Función principal de la página
export default async function OrderPage({ params }: { params: { category: string } }) {
  const { category } = await params // Asegurarse de que los parámetros sean esperados

  // Obtener productos para la categoría
  const products = await getProducts(category)

  return (
    <>
       <Heading>
        Elige y personaliza tu pedido a continuación
        </Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
