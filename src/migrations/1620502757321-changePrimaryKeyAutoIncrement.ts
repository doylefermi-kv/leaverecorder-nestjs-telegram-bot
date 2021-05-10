import { MigrationInterface, QueryRunner } from 'typeorm';

export class changePrimaryKeyAutoIncrement1620502757321
  implements MigrationInterface {
  name = 'changePrimaryKeyAutoIncrement1620502757321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employees" RENAME COLUMN "emp_no" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" RENAME CONSTRAINT "PK_2daea6572d4efff92ddc79ba7f9" TO "PK_b9535a98350d5b26e7eb0c26af4"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "employees_emp_no_seq" RENAME TO "employees_id_seq"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER SEQUENCE "employees_id_seq" RENAME TO "employees_emp_no_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" RENAME CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" TO "PK_2daea6572d4efff92ddc79ba7f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" RENAME COLUMN "id" TO "emp_no"`,
    );
  }
}
