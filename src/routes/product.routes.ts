import { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../types/product";

const productRouter = Router()

const products: Product[] = [
  { id: 'kjdfkdjfjdkf', name: "PC", description: "A computer", price: 1000 },
  { id: 'gaieijakjdf', name: "Phone", description: "A phone", price: 500 },
  { id: '234897ufahh', name: "Tablet", description: "A tablet", price: 300 },
]

productRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(products)
})

productRouter.post("/", (req: Request<{}, {}, Product>, res: Response) => {
  const { name, description, price } = req.body
  const newProduct: Product = { id: uuidv4(), name, description, price}
  products.push(newProduct)
  res.status(201).json(newProduct)
})

productRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const product = products.find(product => product.id === id)
  if (!product) {
    res.status(404).send("Product not found")
    return
  }
  res.status(200).json(product)
})

productRouter.put("/:id", (req: Request<{ id: string }, {}, Partial<Product>>, res: Response) => {
  const { id } = req.params
  const { name, description, price } = req.body
  const index = products.findIndex(product => product.id === id)
  if (index === -1) {
    res.status(404).send("Product not found")
    return
  }

  const updatedProduct = {
    ...products[index],
    name: name ?? products[index].name,
    description: description ?? products[index].description,
    price: price ?? products[index].price
  }

  res.status(200).json(updatedProduct)
})

productRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const index = products.findIndex(product => product.id === id)
  if (index === -1) {
    res.status(404).send("Product not found")
    return
  }
  products.splice(index, 1)
  res.status(200).send("Product was deleted")
})

export default productRouter