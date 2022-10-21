import { MigrationInterface, QueryRunner } from "typeorm";

export class DbInit1666195198432 implements MigrationInterface{
    name?: string;

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE configuration (
            configurationId    VARCHAR PRIMARY KEY
                                       NOT NULL,
            confivurationValue VARCHAR NOT NULL
        )`);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE configuration");
    }

}