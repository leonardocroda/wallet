import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionTable1690661499206 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS transaction (
            id VARCHAR(255) PRIMARY KEY,
            account_id INT,
            external_id VARCHAR(255) NULL,
            amount double,
            type VARCHAR(255),
            sourceDestinationName VARCHAR(255),
            status VARCHAR(255),
            date DATETIME,
            CONSTRAINT FK_account_id FOREIGN KEY (account_id) REFERENCES account(id)
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE transaction`);
  }
}
