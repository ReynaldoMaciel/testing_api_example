import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    url: string;

    @Column()
    description: string;

    @ManyToOne(() => Product, (product) => product.images)
    product: Product
}
