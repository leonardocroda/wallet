import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountTable1690646689826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS account (
          id INT AUTO_INCREMENT PRIMARY KEY,
          balance BIGINT,
          number BIGINT
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE account`);
  }
}
