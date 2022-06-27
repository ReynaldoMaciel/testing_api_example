import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Cart } from "./Cart";
import { ProductImage } from "./ProductImage";

@Entity()
@Unique("UQ_NAMES", ["sku"])
export class Product {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string;

    @Column()
    sku: string;

    @Column()
    price: number;
    
    @Column()
    description: string;

    @Column()
    details: string;

    @Column()
    rate: string;

    @OneToMany(() => ProductImage, (image) => image.product)
    images: ProductImage[]
    
    @ManyToMany(() => Cart)
    @JoinTable()
    cart: Cart[]
}
