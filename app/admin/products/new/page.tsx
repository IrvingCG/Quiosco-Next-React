import Heading from "@/components/ui/Heading";
import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProuctForm";

export default function CreateProductPage() {
  return (
    <>
     <Heading>Nuevo producto</Heading>
  
      <AddProductForm>
        <ProductForm/>
      </AddProductForm>  
    
    </>

  )
}
