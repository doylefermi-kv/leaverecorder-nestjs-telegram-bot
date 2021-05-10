import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1620501064968 implements MigrationInterface {
  name = 'initialMigration1620501064968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "leaves" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "active" boolean NOT NULL, "employeeId" integer, CONSTRAINT "PK_4153ec7270da3d07efd2e11e2a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employees" ("emp_no" SERIAL NOT NULL, "birth_date" TIMESTAMP NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "gender" text NOT NULL, "hire_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_2daea6572d4efff92ddc79ba7f9" PRIMARY KEY ("emp_no"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "leaves" ADD CONSTRAINT "FK_d4278e2dd5d9673eac18b6ab6f8" FOREIGN KEY ("employeeId") REFERENCES "employees"("emp_no") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "leaves" DROP CONSTRAINT "FK_d4278e2dd5d9673eac18b6ab6f8"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "employees"`);
    await queryRunner.query(`DROP TABLE "leaves"`);
  }
}
