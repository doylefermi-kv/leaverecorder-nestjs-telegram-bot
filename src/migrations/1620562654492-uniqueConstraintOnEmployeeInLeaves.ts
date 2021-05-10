import { MigrationInterface, QueryRunner } from 'typeorm';

export class uniqueConstraintOnEmployeeInLeaves1620562654492
  implements MigrationInterface {
  name = 'uniqueConstraintOnEmployeeInLeaves1620562654492';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "unique_telegram"`,
    );
    await queryRunner.query(
      `ALTER TABLE "leaves" DROP CONSTRAINT "FK_d4278e2dd5d9673eac18b6ab6f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "leaves" ALTER COLUMN "employeeId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "unique_telegram_per_employee" UNIQUE ("telegram_id", "email_address")`,
    );
    await queryRunner.query(
      `ALTER TABLE "leaves" ADD CONSTRAINT "FK_d4278e2dd5d9673eac18b6ab6f8" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "leaves" DROP CONSTRAINT "FK_d4278e2dd5d9673eac18b6ab6f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "unique_telegram_per_employee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "leaves" ALTER COLUMN "employeeId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "leaves" ADD CONSTRAINT "FK_d4278e2dd5d9673eac18b6ab6f8" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "unique_telegram" UNIQUE ("telegram_id", "email_address")`,
    );
  }
}
