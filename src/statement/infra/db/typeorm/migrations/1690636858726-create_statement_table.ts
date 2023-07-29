import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatementTable1690636858726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS statement (
          id VARCHAR(255) PRIMARY KEY,
          accountId INT,
          purchaseId VARCHAR(255) NULL,
          transferId VARCHAR(255) NULL,
          amount double,
          type VARCHAR(255),
          sourceDestinationName VARCHAR(255),
          status VARCHAR(255),
          date VARCHAR(255)
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE statement`);
  }
}
