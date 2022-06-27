import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class addForeignKeyProductImage1656188688468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "product_image",
            new TableColumn({
                name: "productId",
                type: "integer",
            }),
        )

        await queryRunner.createForeignKey(
            "product_image",
            new TableForeignKey({
                columnNames: ["productId"],
                referencedColumnNames: ["id"],
                referencedTableName: "product"
            }),
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("product_image")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("productId") !== -1,
        )
        await queryRunner.dropForeignKey("product_image", foreignKey)
        await queryRunner.dropColumn("product_image", "productId")
    }

}
