import { Cart } from "../../models/Cart"
import { Product } from "../../models/Product"
import { ProductImage } from "../../models/ProductImage"
import IMutation from "../../types/Mutation"

type ProductInput = Omit<Product, 'id'>

export default {
  Mutation: {
    createCart: async (_, __, { database }) => {
      const cartRepository = database.getRepository(Cart)
      const cart = await cartRepository.insert({
        products: []
      })
      return cart.generatedMaps[0]
    },
    removeProductFromCart: async (_, { cartId, sku }: { cartId: number, sku: string, quantity: number }, { database }) => {
      const cartRepository = database.getRepository(Cart)
      const [cart] = await cartRepository.find({ 
        where: {
          id: cartId
        },
        relations: ["products", "products.images"]
      })
      const productToBeDeleted = cart.products.findIndex(item => item.sku === sku)
      if (productToBeDeleted === -1) throw new Error(`Product with sku "${sku}" not found in this cart`)
      cart.products.splice(productToBeDeleted, 1)
      await database.manager.save(cart)
      return cart
    },
    addProductToCart: async (_, { cartId, sku, quantity }: { cartId: number, sku: string, quantity: number }, { database }) => {
      const cartRepository = database.getRepository(Cart)
      const productRepository = database.getRepository(Product)
      const [cart] = await cartRepository.find({ 
        where: {
          id: cartId
        },
        relations: ["products", "products.images"]
      })
      const productAlreadyInCart = cart.products.find(item => item.sku === sku)
      if (productAlreadyInCart) throw new Error('Product was already added to the cart')
      const product = await productRepository.findOne({
        where: {
          sku
        },
      })
      product.cart = [cart]
      const newProductsToBeAdded: Product[] = new Array(quantity).fill(product)
      cart.products.push(...newProductsToBeAdded)
      await database.manager.save(cart)
      const [productUpdated] = await cartRepository.find({ relations: ["products", "products.images"]})
      return productUpdated
    },
    addProduct: async (_, { payload }: { payload: ProductInput }, { database }) => {
      const productRepository = database.getRepository(Product)
      const productImageRepository = database.getRepository(ProductImage)
      const productExists = await productRepository.findOneBy({
        sku: payload.sku
      })
      if (productExists) throw new Error(`Product with sku ${payload.sku} already exists`)
      let product = productRepository.create(payload)
      const productCreated = await database.manager.save(product)
      for (const image of product.images) {
        const productImage = productImageRepository.create(image)
        productImage.product = product
        await database.manager.save(productImage)
      }
      return productRepository.findOne({
        where: {
          id: productCreated.id
        },
        relations:{
          images: true
        }
      })
    },
    removeProduct: async (_, { sku }: { sku: string }, { database }) => {
      const productRepository = database.getRepository(Product)
      const deletion = await productRepository.delete({
        sku
      })
      return deletion.affected > 0
    }
  }
} as IMutation
