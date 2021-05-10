import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixModelMajorChanges1620536374912 implements MigrationInterface {
  name = 'fixModelMajorChanges1620536374912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "birth_date"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "hire_date"`);
    await queryRunner.query(
      `ALTER TABLE "leaves" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "leaves" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "telegram_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "email_address" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedDate"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdDate"`);
    await queryRunner.query(
      `ALTER TABLE "employees" DROP COLUMN "updatedDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP COLUMN "createdDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP COLUMN "email_address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP COLUMN "telegram_id"`,
    );
    await queryRunner.query(`ALTER TABLE "leaves" DROP COLUMN "updatedDate"`);
    await queryRunner.query(`ALTER TABLE "leaves" DROP COLUMN "createdDate"`);
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "hire_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "birth_date" TIMESTAMP NOT NULL`,
    );
  }
}
