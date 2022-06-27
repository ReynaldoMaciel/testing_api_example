import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createProductsImagesTable1656187602024 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "product_image",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                    },
                    {
                        name: "url",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product_image")
    }

}
