import { Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number
  
  @ManyToMany(() => Product, (product) => product.cart)
  @JoinTable()
  products: Product[]
}
