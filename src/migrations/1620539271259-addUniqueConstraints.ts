import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUniqueConstraints1620539271259 implements MigrationInterface {
  name = 'addUniqueConstraints1620539271259';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "unique_telegram" UNIQUE ("telegram_id", "email_address")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "unique_telegram"`,
    );
  }
}
