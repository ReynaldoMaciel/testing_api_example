const { gql } = require('apollo-server');

const ProductSchema = gql`
  extend type Query {
    carts: [Cart]
    product(sku: String!): Product
    products(page: Int, size: Int, filters: [ProductFilter]): ProductPaginated
  }

  extend type Mutation { 
    createCart: Cart!
    removeProductFromCart(cartId: Int, sku: String): Cart!
    addProductToCart(cartId: Int, sku: String, quantity: Int): Cart!
    addProduct(payload: ProductInput): Product!
    removeProduct(sku: String!): Boolean!
  }

  type ProductPaginated {
    quantity: Int
    products: [Product]
  }

  type Product @key(fields: "sku"){
    sku: String!
    name: String
    price: Float
    description: String
    details: String
    rate: Int
    images: [ProductImage]
  }

  input ProductInput {
    sku: String!
    name: String!
    price: Float!
    description: String
    details: String
    rate: Int
    images: [ProductImageInput]
  }

  type Cart @key(fields: "id"){
    id: ID!
    products: [Product]
  }

  type ProductImage @key(fields: "id"){
    id: ID!
    url: String
    description: String
  }

  input ProductImageInput {
    url: String
    description: String
  }

  input ProductFilter {
    field: String!
    condition: String!
    value: String!
  }
`;

export default ProductSchema;