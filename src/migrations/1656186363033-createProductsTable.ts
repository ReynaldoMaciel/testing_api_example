import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createProductsTable1656186363033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "product",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "sku",
                        type: "varchar",
                    },
                    {
                        name: "price",
                        type: "decimal",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "details",
                        type: "text",
                    },
                    {
                        name: "rate",
                        type: "integer"
                    }
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product")
    }
}
