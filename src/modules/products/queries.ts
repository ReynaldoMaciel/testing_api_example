import { Product } from "../../models/Product"
import { Cart } from "../../models/Cart"
import IQuery from "../../types/Query"

export default {
  Query: {
    carts: async (_, __, { database }) => {
      const cartRepository = database.getRepository(Cart)
      const carts = await cartRepository.find({ relations: ["products", "products.images"]})
      return carts
    },
    products: async (_, __, { database }) => {
      const productRepository = database.getRepository(Product)
      const [products, quantity] = await productRepository.findAndCount({
        relations: {
          images: true
        }
      })
      return {
        products,
        quantity
      }
    },
    product: async (_, { sku }: { sku: string} , { database }) => {
      const productRepository = database.getRepository(Product)
      const product = await productRepository.findOne({
        where:{
          sku
        },
        relations: {
          images: true
        }
      })
      return product
    }
  }
} as IQuery