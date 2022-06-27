import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class createCartProductTable1656204976855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cart_products_product",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                    },
                    {
                        name: "cartId",
                        type: "integer",
                    },
                    {
                        name: "productId",
                        type: "integer",
                    },
                ],
            }),
            true,
        )        

        await queryRunner.createForeignKey(
            "cart_products_product",
            new TableForeignKey({
                columnNames: ["productId"],
                referencedColumnNames: ["id"],
                referencedTableName: "product"
            }),
        )
        await queryRunner.createForeignKey(
            "cart_products_product",
            new TableForeignKey({
                columnNames: ["cartId"],
                referencedColumnNames: ["id"],
                referencedTableName: "cart"
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table1 = await queryRunner.getTable("cart_products_product")
        const foreignKey1 = table1.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("cartId") !== -1,
        )
        
        const foreignKey2 = table1.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("productId") !== -1,
        )
        await queryRunner.dropForeignKey("cart_products_product", foreignKey1)
        await queryRunner.dropForeignKey("cart_products_product", foreignKey2)
        await queryRunner.dropTable("cart_products_product")
    }

}
