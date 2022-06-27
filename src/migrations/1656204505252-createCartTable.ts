import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createCartTable1656204505252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cart",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        generationStrategy: 'increment',
                    },
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cart")
    }

}
